import { LitElement, html, css } from 'lit-element'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '@things-factory/shell'

import './app-toolbar'

class HeaderBar extends connect(store)(LitElement) {
  static get properties() {
    return {
      _page: String
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
        }
      `
    ]
  }

  render() {
    return html`
      <app-toolbar>
        ${this._isHome()
          ? html``
          : html`
              <mwc-icon @click=${e => history.back()} slot="left-end">arrow_back</mwc-icon>
            `}
      </app-toolbar>
    `
  }

  stateChanged(state) {
    this._page = state.route.page
    this._defaultPage = state.route.defaultRoutePage
  }

  _isHome() {
    // TODO.. 정확한 방법 또는 을 찾아야 한다.
    if (this._page == this._defaultPage) {
      return true
    }

    var pathname = location.pathname
    if (pathname == '/' || pathname.startsWith(`/${this._defaultPage}`)) {
      return true
    }

    return false
  }
}

customElements.define('header-bar', HeaderBar)
