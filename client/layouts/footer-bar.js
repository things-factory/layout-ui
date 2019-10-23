import { LitElement, html, css } from 'lit-element'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '@things-factory/shell'

import '../components/floating-overlay'
import '../components/resize-splitter'

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
      `
    ]
  }

  render() {
    var viewparts = this.viewparts
    var footerbars = Object.keys(viewparts)
      .map(name => {
        return {
          name,
          ...viewparts[name]
        }
      })
      .filter(viewpart => viewpart.position == 'footerbar')

    return html`
      ${footerbars.map(footerbar =>
        !footerbar.show
          ? html``
          : footerbar.hovering
          ? html`
              <floating-overlay
                .backdrop=${footerbar.backdrop}
                direction="up"
                .hovering=${footerbar.hovering}
                .name=${footerbar.name}
                .title=${footerbar.title}
                .size=${footerbar.size}
                .closable=${footerbar.closable}
                >${footerbar.template}</floating-overlay
              >
            `
          : html`
              <div footerbar>
                ${footerbar.template}
              </div>
              ${footerbar.resizable
                ? html`
                    <resize-splitter
                      @splitter-dragstart=${e => this.resizeStart(e)}
                      @splitter-drag=${e => this.resizeDrag(e)}
                    ></resize-splitter>
                  `
                : html``}
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

  resizeStart(e) {
    this._startHeight = e.target.previousElementSibling.offsetHeight
  }

  resizeDrag(e) {
    var delta = e.detail

    var x = e.target.previousElementSibling.querySelectorAll('*')
    Array.from(x).forEach(ele => {
      ele.style.height = `${this._startHeight - delta.y}px`
    })
  }

  stateChanged(state) {
    this._snackbar = state.snackbar

    this.viewparts = state.layout.viewparts || {}
  }
}

customElements.define('footer-bar', FooterBar)
