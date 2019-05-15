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
          flex-direction: column;
        }

        *[hovering] {
          position: absolute;
          left: 0;
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
            ${navbar.template}
          `
      )}
    `
  }

  stateChanged(state) {
    this._navbars = state.layout.navbars || []
  }
}

customElements.define('nav-bar', NavBar)
