import { TOGGLE_OVERLAY } from '@things-factory/layout-base'
import { store } from '@things-factory/shell'
import { css, html, LitElement } from 'lit-element'

class FooterOverlay extends LitElement {
  static get properties() {
    return {
      show: Boolean,
      template: Object,
      footerHeight: String
    }
  }

  static get styles() {
    return [
      css`
        #modal[hidden] {
          display: none;
        }

        #modal {
          display: flex;
          flex-direction: column;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          margin-bottom: var(--overlay-margin-bottom, 0px);
        }
      `
    ]
  }

  render() {
    return html`
      <div id="modal" ?hidden="${!this.show}" @click="${this._toggleOverlay}">
        ${this.template}
      </div>
    `
  }

  updated(changedProps) {
    if (changedProps.has('footerHeight')) {
      this.style.setProperty('--overlay-margin-bottom', this.footerHeight)
    }
  }

  _toggleOverlay(event) {
    if (event.target === event.currentTarget) {
      store.dispatch({
        type: TOGGLE_OVERLAY
      })
    }
  }
}

customElements.define('footer-overlay', FooterOverlay)
