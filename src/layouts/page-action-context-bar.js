import { connect } from 'pwa-helpers/connect-mixin'
import { LitElement, html, css } from 'lit-element'

class PageActionContextBar extends LitElement {
  static get properties() {
    return {
      actions: Array
    }
  }

  static get styles() {
    return [
      css`
        :host {
          margin: auto 0px auto auto;
        }
      `
    ]
  }

  render() {
    return html`
      ${(this.actions || []).map(
        action => html`
          ${action.select && action.select.length > 0
            ? html`
                <select @change="${action.action}">
                  ${action.select.map(
                    option => html`
                      <option>${option}</option>
                    `
                  )}
                </select>
              `
            : html`
                <button @click="${action.action}">${action.title}</button>
              `}
        `
      )}
    `
  }
}

customElements.define('page-action-context-bar', PageActionContextBar)
