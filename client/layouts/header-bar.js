import { LitElement, html, css } from 'lit-element'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '@things-factory/shell'

import './app-toolbar'

class HeaderBar extends connect(store)(LitElement) {
  static get properties() {
    return {}
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
      <app-toolbar> </app-toolbar>
    `
  }

  stateChanged(state) {
    // TODO header-bar 들을 가져와서 render 할 수 있게 한다.
  }
}

customElements.define('header-bar', HeaderBar)
