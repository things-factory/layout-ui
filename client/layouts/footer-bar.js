import { LitElement, html, css } from 'lit-element'

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
      _context: Object,
      _overlayShow: Boolean,
      _overlayTemplate: Object,
      _footerHeight: Object
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          border-top: 1px solid gray;
        }
        .virtual-space {
          flex: 1;
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
      <footer-overlay
        .show="${this._overlayShow}"
        .template="${this._overlayTemplate}"
        .footerHeight="${this._footerHeight}"
      ></footer-overlay>

      <slot name="front"></slot>
      ${frontContextTools.map(
        tool => html`
          ${tool.template}
        `
      )}

      <div class="virtual-space"></div>

      <slot name="rear"></slot>
      ${rearContextTools.map(
        tool => html`
          ${tool.template}
        `
      )}

      <snack-bar ?active=${this._snackbarOpened}>${this._message}</snack-bar>
    `
  }

  updated(changedProps) {
    if (changedProps.has('_overlayShow') && this._overlayShow) {
      this._footerHeight = getComputedStyle(this).height
    }
  }

  stateChanged(state) {
    this._message = state.snackbar.message
    this._snackbarOpened = state.snackbar.snackbarOpened

    this._footers = (state.layout && state.layout.footers) || []
    this._context = (state.route && state.route.context) || {}

    this._overlayShow = (state.layout.overlay && state.layout.overlay.show) || false
    this._overlayTemplate = (state.layout.overlay && state.layout.overlay.template) || ''
  }
}

customElements.define('footer-bar', FooterBar)
