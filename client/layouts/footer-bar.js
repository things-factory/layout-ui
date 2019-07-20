import { LitElement, html, css } from 'lit-element'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '@things-factory/shell'

import '../components/floating-overlay'
import './snack-bar'

class FooterBar extends connect(store)(LitElement) {
  static get properties() {
    return {
      _snackbar: Object,
      viewparts: Array
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
    var viewparts = this.viewparts
    var footerbars = Object.keys(viewparts)
      .map(name => viewparts[name])
      .filter(viewpart => viewpart.position == 'footerbar')

    return html`
      ${footerbars.map(footerbar =>
        !footerbar.show
          ? html``
          : footerbar.hovering
          ? html`
              <floating-overlay .backdrop=${footerbar.backdrop} direction="up" .hovering=${footerbar.hovering}
                >${footerbar.template}</floating-overlay
              >
            `
          : html`
              <div footerbar>
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

  stateChanged(state) {
    this._snackbar = state.snackbar

    this.viewparts = state.layout.viewparts || {}
  }
}

customElements.define('footer-bar', FooterBar)
