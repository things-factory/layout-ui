import { LitElement, html, css } from 'lit-element'

import '@material/mwc-icon/mwc-icon'
import '@material/mwc-button/mwc-button'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '@things-factory/shell'

import './page-action-context-bar'

import './snack-bar'

class FooterBar extends connect(store)(LitElement) {
  static get properties() {
    return {
      _page: String,
      _message: String,
      _snackbarOpened: Boolean,
      _footers: Array,
      _actions: Array
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
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
      ${frontContextTools.map(
        tool => html`
          <div @click="${this.onContextSelect}">
            ${tool.template}
          </div>
        `
      )}

      <slot name="rear"></slot>
      ${rearContextTools.map(
        tool => html`
          <div @click="${this.onContextSelect}">
            ${tool.template}
          </div>
        `
      )}

      <page-action-context-bar .actions="${this._actions}"></page-action-context-bar>

      <snack-bar ?active=${this._snackbarOpened}>${this._message}</snack-bar>
    `
  }

  stateChanged(state) {
    this._page = state.app.page

    this._message = state.snackbar.message
    this._snackbarOpened = state.snackbar.snackbarOpened

    this._footers = state.layout.footers
    this._actions = state.route.context.actions || []
  }
}

customElements.define('footer-bar', FooterBar)
