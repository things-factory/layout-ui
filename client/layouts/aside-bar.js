import { LitElement, html, css } from 'lit-element'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '@things-factory/shell'

class AsideBar extends connect(store)(LitElement) {
  static get properties() {
    return {
      _asidebars: Array,
      _height: Number
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
        }

        *[asidebar] {
          position: relative;
          right: 0;
          max-width: 70vw;
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
            <div ?hovering=${asidebar.hovering} style="height:${this._height}px;" asidebar>
              ${asidebar.template}
            </div>
          `
      )}
    `
  }

  firstUpdated() {
    this._height = this.offsetHeight

    const resizeObserver = new ResizeObserver(entry => {
      this._height = this.offsetHeight
    })

    resizeObserver.observe(this)
  }

  stateChanged(state) {
    this._asidebars = state.layout.asidebars || []
  }
}

customElements.define('aside-bar', AsideBar)
