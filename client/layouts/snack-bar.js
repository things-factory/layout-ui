import '@material/mwc-button'
import '@material/mwc-icon'
import { CLOSE_SNACKBAR } from '@things-factory/layout-base'
import { store } from '@things-factory/shell'
import { css, html, LitElement } from 'lit-element'

class SnackBar extends LitElement {
  static get properties() {
    return {
      level: String,
      message: String,
      active: Boolean,
      action: Object
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
          position: fixed;
          top: 100%;
          left: 0;
          right: 0;
          padding: 12px;
          background-color: black;
          color: white;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          text-align: center;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          transition-property: visibility, transform;
          transition-duration: 0.2s;
          visibility: hidden;
        }

        :host([active]) {
          visibility: visible;
          transform: translate3d(0, -100%, 0);
        }

        mwc-icon {
          --mdc-icon-size: 1.2em;
          vertical-align: middle;
          max-width: 20px;
        }

        .info {
          color: green;
        }

        .warn {
          color: yellow;
        }

        .error {
          color: red;
        }

        @media (min-width: 460px) {
          :host {
            width: 320px;
            margin: auto;
          }
        }
      `
    ]
  }

  render() {
    return html`
      <span>
        <mwc-icon class=${this.level}
          >${this.level == 'info'
            ? html`
                notification_important
              `
            : this.level == 'warn'
            ? html`
                warning
              `
            : this.level == 'error'
            ? html`
                error
              `
            : html``}</mwc-icon
        >
      </span>
      <span>${this.message}</span>
      ${this.action && this.action.label
        ? html`
            <mwc-button
              @click=${e => {
                store.dispatch({ type: CLOSE_SNACKBAR })
                this.action.callback()
              }}
              >${this.action.label}</mwc-button
            >
          `
        : html``}
    `
  }
}

window.customElements.define('snack-bar', SnackBar)
