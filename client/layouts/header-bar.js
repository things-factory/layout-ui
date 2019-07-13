import { LitElement, html, css } from 'lit-element'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '@things-factory/shell'

import './app-toolbar'

class HeaderBar extends connect(store)(LitElement) {
  static get properties() {
    return {
      _headerbars: Array
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
          background-color: var(--primary-background-color);
        }
      `
    ]
  }

  render() {
    return html`
      <app-toolbar> </app-toolbar>

      ${this._headerbars.map(
        headerbar =>
          html`
            ${headerbar.template}
          `
      )}
    `
  }

  stateChanged(state) {
    this._headerbars = state.layout.headerbars || []
  }
}

customElements.define('header-bar', HeaderBar)
