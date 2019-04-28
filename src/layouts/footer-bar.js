import { LitElement, html, css } from 'lit-element'

import '@material/mwc-icon/mwc-icon'
import '@material/mwc-button/mwc-button'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '@things-factory/shell'

import './snack-bar'

class FooterBar extends connect(store)(LitElement) {
  static get properties() {
    return {
      _footers: Array,
      _message: String,
      _snackbarOpened: Boolean
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
      <slot> </slot>

      ${this._footers.map(
        footers =>
          html`
            ${footers.template}
          `
      )}

      <snack-bar ?active=${this._snackbarOpened}>${this._message}</snack-bar>
    `
  }

  stateChanged(state) {
    this._footers = state.layout.footers || []

    this._message = state.snackbar.message
    this._snackbarOpened = state.snackbar.snackbarOpened
  }
}

customElements.define('footer-bar', FooterBar)
