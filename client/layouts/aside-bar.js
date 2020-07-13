import { LitElement, html, css } from 'lit-element'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, ScrollbarStyles } from '@things-factory/shell'
import { VIEWPART_LEVEL } from '@things-factory/layout-base'

import '../components/floating-overlay'
import '../components/resize-splitter'

class AsideBar extends connect(store)(LitElement) {
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
      ScrollbarStyles,
      css`
        :host {
          display: flex;
          flex-flow: row-reverse nowrap;
          align-items: stretch;

          position: relative;
        }

        *[asidebar] {
          display: block;
          overflow-y: auto;
        }
      `
    ]
  }

  render() {
    var viewparts = this.viewparts
    var asidebars = Object.keys(viewparts)
      .map(name => {
        return {
          name,
          ...viewparts[name]
        }
      })
      .filter(viewpart => viewpart.position == 'asidebar' && (!this.fullbleed || viewpart.hovering))

    asidebars = [
      ...asidebars.filter(viewpart => viewpart.level == VIEWPART_LEVEL.TOPMOST),
      ...asidebars.filter(viewpart => viewpart.level !== VIEWPART_LEVEL.TOPMOST)
    ]

    return html`
      ${asidebars.map(asidebar =>
        !asidebar.show
          ? html``
          : asidebar.hovering
          ? html`
              <floating-overlay
                .backdrop=${asidebar.backdrop}
                direction="left"
                .hovering=${asidebar.hovering}
                .name=${asidebar.name}
                .size=${asidebar.size}
                .title=${asidebar.title}
                .closable=${asidebar.closable}
                >${asidebar.template}</floating-overlay
              >
            `
          : html`
              <div asidebar>
                ${asidebar.template}
              </div>
              ${asidebar.resizable
                ? html`
                    <resize-splitter
                      @splitter-dragstart=${e => this.resizeStart(e)}
                      @splitter-drag=${e => this.resizeDrag(e)}
                      vertical
                    ></resize-splitter>
                  `
                : html``}
            `
      )}
    `
  }

  resizeStart(e) {
    this._startWidth = e.target.previousElementSibling.offsetWidth
  }

  resizeDrag(e) {
    var delta = e.detail

    var x = e.target.previousElementSibling.querySelectorAll('*')
    Array.from(x).forEach(ele => {
      ele.style.width = `${this._startWidth - delta.x}px`
    })
  }

  stateChanged(state) {
    this.viewparts = state.layout.viewparts || {}
  }
}

customElements.define('aside-bar', AsideBar)
