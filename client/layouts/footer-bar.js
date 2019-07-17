import { LitElement, html, css } from 'lit-element'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '@things-factory/shell'

import './snack-bar'

class FooterBar extends connect(store)(LitElement) {
  static get properties() {
    return {
      _snackbar: Object,
      _footerbars: Array,
      _overlayShow: Boolean,
      _overlayTemplate: Object
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-flow: column-reverse nowrap;
          align-items: stretch;

          position: relative;
        }

        *[footerbar] {
          display: block;
        }

        *[hovering] {
          position: absolute;
        }
      `
    ]
  }

  render() {
    return html`
      ${this._footerbars.map(
        footerbar =>
          html`
            <div ?hovering=${footerbar.hovering} footerbar>
              ${footerbar.template}
            </div>
          `
      )}

      <snack-bar
        ?active=${this._snackbar.snackbarOpened}
        .level=${this._snackbar.level}
        .message=${this._snackbar.message}
      >
      </snack-bar>
    `
  }

  updated(changedProps) {
    if (changedProps.has('_overlayShow') && this._overlayShow) {
    }
  }

  stateChanged(state) {
    this._snackbar = state.snackbar
    this._footerbars = (state.layout && state.layout.footers) || []

    this._overlayShow = (state.layout.overlay && state.layout.overlay.show) || false
    this._overlayTemplate = (state.layout.overlay && state.layout.overlay.template) || ''
  }
}

customElements.define('footer-bar', FooterBar)
