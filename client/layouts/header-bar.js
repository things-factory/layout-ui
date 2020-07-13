import { LitElement, html, css } from 'lit-element'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '@things-factory/shell'
import { VIEWPART_LEVEL } from '@things-factory/layout-base'

import '../components/floating-overlay'
import '../components/resize-splitter'

class HeaderBar extends connect(store)(LitElement) {
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
          flex-flow: column nowrap;
          align-items: stretch;

          position: relative;

          background-color: var(--header-bar-background-color);
        }

        *[headerbar] {
          display: block;
        }
      `
    ]
  }

  render() {
    var viewparts = this.viewparts
    var headerbars = Object.keys(viewparts)
      .map(name => {
        return {
          name,
          ...viewparts[name]
        }
      })
      .filter(viewpart => viewpart.position == 'headerbar' && (!this.fullbleed || viewpart.hovering))

    headerbars = [
      ...headerbars.filter(viewpart => viewpart.level == VIEWPART_LEVEL.TOPMOST),
      ...headerbars.filter(viewpart => viewpart.level !== VIEWPART_LEVEL.TOPMOST)
    ]

    return html`
      ${headerbars.map(headerbar =>
        !headerbar.show
          ? html``
          : headerbar.hovering
          ? html`
              <floating-overlay
                .backdrop=${headerbar.backdrop}
                direction="down"
                .hovering=${headerbar.hovering}
                .name=${headerbar.name}
                .title=${headerbar.title}
                .size=${headerbar.size}
                .closable=${headerbar.closable}
                >${headerbar.template}</floating-overlay
              >
            `
          : html`
              <div headerbar>
                ${headerbar.template}
              </div>
              ${headerbar.resizable
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
      ele.style.height = `${this._startHeight + delta.y}px`
    })
  }

  stateChanged(state) {
    this.viewparts = state.layout.viewparts || {}
  }
}

customElements.define('header-bar', HeaderBar)
