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

          overflow: hidden;
          background-color: var(--nav-bar-background-color);
        }

        *[navbar] {
          position: relative;
          left: 0;
          max-width: 70vw;
          height: 100%;

          overflow: auto;
        }

        *[hovering] {
          position: absolute;
        }
      `
    ]
  }

  render() {
    var viewparts = this.viewparts
    var navbars = Object.keys(viewparts)
      .map(name => viewparts[name])
      .filter(viewpart => viewpart.type == 'navbar')

    return html`
      ${navbars.map(navbar =>
        !navbar.show
          ? html``
          : navbar.hovering
          ? html`
              <floating-overlay .backdrop=${navbar.backdrop} direction="right" .hovering=${this.hovering}
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
