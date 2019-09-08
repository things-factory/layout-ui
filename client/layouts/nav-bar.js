import { LitElement, html, css } from 'lit-element'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, ScrollbarStyles } from '@things-factory/shell'

import '../components/floating-overlay'

class NavBar extends connect(store)(LitElement) {
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
          flex-flow: row nowrap;
          align-items: stretch;

          position: relative;

          background-color: var(--nav-bar-background-color);
        }

        *[navbar] {
          display: block;
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
      .filter(viewpart => viewpart.position == 'navbar')

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
                >${navbar.template}</floating-overlay
              >
            `
          : html`
              <div navbar>
                ${navbar.template}
              </div>
            `
      )}
    `
  }

  stateChanged(state) {
    this.viewparts = state.layout.viewparts || {}
  }
}

customElements.define('nav-bar', NavBar)
