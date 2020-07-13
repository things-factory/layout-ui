import { store } from '@things-factory/shell'
import { css, html, LitElement } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { VIEWPART_LEVEL } from '@things-factory/layout-base'

import '../components/floating-overlay'
import '../components/resize-splitter'

class FooterBar extends connect(store)(LitElement) {
  static get properties() {
    return {
      viewparts: Array,
      fullbleed: {
        attribute: 'fullbleed',
        type: Boolean
      }
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
      .filter(viewpart => viewpart.position == 'footerbar' && (!this.fullbleed || viewpart.hovering))

    footerbars = [
      ...footerbars.filter(viewpart => viewpart.level == VIEWPART_LEVEL.TOPMOST),
      ...footerbars.filter(viewpart => viewpart.level !== VIEWPART_LEVEL.TOPMOST)
    ]

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
    this.viewparts = state.layout.viewparts || {}
  }
}

customElements.define('footer-bar', FooterBar)
