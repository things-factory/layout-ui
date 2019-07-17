import { LitElement, html, css } from 'lit-element'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '@things-factory/shell'

import './context-toolbar'
import './snack-bar'

import '../components/floating-overlay'

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

        [hidden] {
          display: none;
        }
      `
    ]
  }

  render() {
    return html`
      <context-toolbar></context-toolbar>

      <floating-overlay
        ?hidden=${!this._overlayShow}
        backdrop="true"
        direction="up"
        @close-overlay=${e => {
          this._overlayShow = false
        }}
        footerbar
        >${this._overlayTemplate}</floating-overlay
      >

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
