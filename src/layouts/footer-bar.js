import { LitElement, html, css } from 'lit-element'

import '@material/mwc-icon/mwc-icon'
import '@material/mwc-button/mwc-button'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '@things-factory/shell'
import { TOGGLE_PRINT_CONTEXT } from '@things-factory/print-base'

import './page-action-context-bar'

import './snack-bar'

class FooterBar extends connect(store)(LitElement) {
  static get properties() {
    return {
      _page: String,
      _message: String,
      _snackbarOpened: Boolean,
      _footers: Array,
      _context: Object
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          border-top: 1px solid gray;
        }
      `
    ]
  }

  render() {
    var frontContextTools = this._footers.filter(
      tool => tool.position == TOOL_POSITION.FRONT_END || tool.position == TOOL_POSITION.FRONT
    )
    var rearContextTools = this._footers.filter(
      tool => tool.position == TOOL_POSITION.REAR_END || tool.position == TOOL_POSITION.REAR
    )

    return html`
      <slot name="front"></slot>
      ${frontContextTools.map(tool =>
        !tool.context || this._context[tool.context]
          ? html`
              ${tool.context.template}
            `
          : html``
      )}

      <slot name="rear"></slot>
      ${rearContextTools.map(tool =>
        !tool.context || this._context[tool.context]
          ? html`
              ${tool.context.template}
            `
          : html``
      )}

      <snack-bar ?active=${this._snackbarOpened}>${this._message}</snack-bar>
    `
  }

  stateChanged(state) {
    this._page = state.app.page

    this._message = state.snackbar.message
    this._snackbarOpened = state.snackbar.snackbarOpened

    this._footers = state.layout.footers
    this._context = state.context
  }
}

customElements.define('footer-bar', FooterBar)
