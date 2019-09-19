import { LitElement, html, css } from 'lit-element'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '@things-factory/shell'

import '../components/floating-overlay'

class HeaderBar extends connect(store)(LitElement) {
  static get properties() {
    return {
      viewparts: Array
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

          background-color: var(--header-bar-background-color);
        }

        *[headerbar] {
          display: block;
        }
      `
    ]
  }

  render() {
    var viewparts = this.viewparts
    var headerbars = Object.keys(viewparts)
      .map(name => {
        return {
          name,
          ...viewparts[name]
        }
      })
      .filter(viewpart => viewpart.position == 'headerbar')

    return html`
      ${headerbars.map(headerbar =>
        !headerbar.show
          ? html``
          : headerbar.hovering
          ? html`
              <floating-overlay
                .backdrop=${headerbar.backdrop}
                direction="down"
                .hovering=${headerbar.hovering}
                .name=${headerbar.name}
                .size=${headerbar.size}
                >${headerbar.template}</floating-overlay
              >
            `
          : html`
              <div headerbar>
                ${headerbar.template}
              </div>
            `
      )}
    `
  }

  stateChanged(state) {
    this.viewparts = state.layout.viewparts || {}
  }
}

customElements.define('header-bar', HeaderBar)
