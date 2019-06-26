import { LitElement, html, css } from 'lit-element'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '@things-factory/shell'

import ResizeObserver from 'resize-observer-polyfill'

class NavBar extends connect(store)(LitElement) {
  static get properties() {
    return {
      _navbars: Array,
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

        *[navbar] {
          position: relative;
          left: 0;
          max-width: 70vw;
          overflow-x: hidden;
          overflow-y: auto;
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
            <div ?hovering=${navbar.hovering} style="height:${this._height}px;" navbar>
              ${navbar.template}
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
    this._navbars = state.layout.navbars || []
  }
}

customElements.define('nav-bar', NavBar)
