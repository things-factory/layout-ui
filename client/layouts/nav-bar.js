import { LitElement, html, css } from 'lit-element'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, ScrollbarStyles } from '@things-factory/shell'
import { VIEWPART_LEVEL } from '@things-factory/layout-base'

import '../components/floating-overlay'
import '../components/resize-splitter'

class NavBar extends connect(store)(LitElement) {
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
          flex-flow: row nowrap;
          align-items: stretch;

          position: relative;

          background-color: var(--nav-bar-background-color);
        }

        *[navbar] {
          display: flex;
          flex-direction: row;
          overflow-y: auto;
        }
      `
    ]
  }

  render() {
    var viewparts = this.viewparts
    var navbars = Object.keys(viewparts)
      .map(name => {
        return {
          name,
          ...viewparts[name]
        }
      })
      .filter(viewpart => viewpart.position == 'navbar' && (!this.fullbleed || viewpart.hovering))

    navbars = [
      ...navbars.filter(viewpart => viewpart.level == VIEWPART_LEVEL.TOPMOST),
      ...navbars.filter(viewpart => viewpart.level !== VIEWPART_LEVEL.TOPMOST)
    ]

    return html`
      ${navbars.map(navbar =>
        !navbar.show
          ? html``
          : navbar.hovering
          ? html`
              <floating-overlay
                .backdrop=${navbar.backdrop}
                direction="right"
                .hovering=${navbar.hovering}
                .name=${navbar.name}
                .title=${navbar.title}
                .size=${navbar.size}
                .closable=${navbar.closable}
                >${navbar.template}</floating-overlay
              >
            `
          : html`
              <div navbar>
                ${navbar.template}
              </div>
              ${navbar.resizable
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
      ele.style.width = `${this._startWidth + delta.x}px`
    })
  }

  stateChanged(state) {
    this.viewparts = state.layout.viewparts || {}
  }
}

customElements.define('nav-bar', NavBar)
