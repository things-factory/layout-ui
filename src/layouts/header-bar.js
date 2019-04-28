import { LitElement, html, css } from 'lit-element'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '@things-factory/shell'

import './app-toolbar'

class HeaderBar extends connect(store)(LitElement) {
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
      <app-toolbar .activePage=${this._page}>
        <mwc-icon slot="left-end">arrow_back</mwc-icon>
      </app-toolbar>
    `
  }

  stateChanged(state) {
    this._page = state.app.page
  }
}

customElements.define('header-bar', HeaderBar)
