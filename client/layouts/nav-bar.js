import { LitElement, html, css } from 'lit-element'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '@things-factory/shell'

class NavBar extends connect(store)(LitElement) {
  static get properties() {
    return {
      _navbars: Array
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
        }

        *[navbar] {
          position: relative;
          left: 0;
          max-width: 70vw;
          height: 100%;
          overflow-x: hidden;
          overflow-y: auto;
        }

        *[hovering] {
          position: absolute;
        }
      `
    ]
  }

  render() {
    return html`
      <slot> </slot>

      ${this._navbars.map(
        navbar =>
          html`
            <div ?hovering=${navbar.hovering} navbar>
              ${navbar.template}
            </div>
          `
      )}
    `
  }

  stateChanged(state) {
    this._navbars = state.layout.navbars || []
  }
}

customElements.define('nav-bar', NavBar)
