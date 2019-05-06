import { LitElement, html, css } from 'lit-element'

import '@material/mwc-icon/mwc-icon'
import '@material/mwc-button/mwc-button'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '@things-factory/shell'

import { TOOL_POSITION } from '@things-factory/layout-base'

import './snack-bar'

class FooterBar extends connect(store)(LitElement) {
  static get properties() {
    return {
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
      tool =>
        tool &&
        tool.position &&
        (tool.position == TOOL_POSITION.FRONT_END || tool.position == TOOL_POSITION.FRONT) &&
        (!tool.context || this._context[tool.context])
    )

    var rearContextTools = this._footers.filter(
      tool =>
        tool &&
        tool.position &&
        (tool.position == TOOL_POSITION.REAR_END || tool.position == TOOL_POSITION.REAR) &&
        (!tool.context || this._context[tool.context])
    )

    return html`
      <slot name="front"></slot>
      ${frontContextTools.map(
        tool => html`
          ${tool.template}
        `
      )}

      <slot name="rear"></slot>
      ${rearContextTools.map(
        tool => html`
          ${tool.template}
        `
      )}

      <snack-bar ?active=${this._snackbarOpened}>${this._message}</snack-bar>
    `
  }

  stateChanged(state) {
    this._message = state.snackbar.message
    this._snackbarOpened = state.snackbar.snackbarOpened

    this._footers = (state.layout && state.layout.footers) || []
    this._context = (state.route && state.route.context) || {}
  }
}

customElements.define('footer-bar', FooterBar)
