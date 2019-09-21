import { LitElement, html, css } from 'lit-element'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, ScrollbarStyles } from '@things-factory/shell'

import '../components/floating-overlay'

class AsideBar extends connect(store)(LitElement) {
  static get properties() {
    return {
      viewparts: Array
    }
  }

  static get styles() {
    return [
      ScrollbarStyles,
      css`
        :host {
          display: flex;
          flex-direction: row-reverse nowrap;
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
      .filter(viewpart => viewpart.position == 'asidebar')

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
            `
      )}
    `
  }

  stateChanged(state) {
    this.viewparts = state.layout.viewparts || {}
  }
}

customElements.define('aside-bar', AsideBar)
