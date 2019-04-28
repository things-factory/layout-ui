import { LitElement, html, css } from 'lit-element'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '@things-factory/shell'

class AsideBar extends connect(store)(LitElement) {
  static get properties() {
    return {
      _asidebars: Array
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
          right: 0;
        }
      `
    ]
  }

  render() {
    return html`
      <slot> </slot>

      ${this._asidebars.map(
        asidebar =>
          html`
            <div ?hovering=${asidebar.hovering}>
              ${asidebar.template}
            </div>
          `
      )}
    `
  }

  stateChanged(state) {
    this._asidebars = state.layout.asidebars || []
  }
}

customElements.define('aside-bar', AsideBar)
