import { LitElement, html, css } from 'lit-element'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '@things-factory/shell'

import './footer-overlay'
import './context-toolbar'
import './snack-bar'

class FooterBar extends connect(store)(LitElement) {
  static get properties() {
    return {
      _message: String,
      _snackbarOpened: Boolean,
      _footerbars: Array,
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
          flex-direction: column;

          border-top: 1px solid gray;
        }
      `
    ]
  }

  render() {
    return html`
      <footer-overlay
        .show="${this._overlayShow}"
        .template="${this._overlayTemplate}"
        .footerHeight="${this._footerHeight}"
        hovering
        footerbar
      ></footer-overlay>

      <context-toolbar></context-toolbar>

      ${this._footerbars.map(
        footerbar =>
          html`
            <div ?hovering=${footerbar.hovering} style="height:${this._height}px;" footerbar>
              ${footerbar.template}
            </div>
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

    this._footerbars = (state.layout && state.layout.footers) || []

    this._overlayShow = (state.layout.overlay && state.layout.overlay.show) || false
    this._overlayTemplate = (state.layout.overlay && state.layout.overlay.template) || ''
  }
}

customElements.define('footer-bar', FooterBar)
