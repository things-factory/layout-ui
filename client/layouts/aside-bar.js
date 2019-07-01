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
          align-items: stretch;

          position: relative;
        }

        *[asidebar] {
          position: relative;
          right: 0;
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

      ${this._asidebars.map(
        asidebar =>
          html`
            <div ?hovering=${asidebar.hovering} asidebar>
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
