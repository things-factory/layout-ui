import { LitElement, html, css } from 'lit-element'

class PageContextSelector extends LitElement {
  static get properties() {
    return {
      _options: Array
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
        }
      `
    ]
  }

  render() {
    return html`
      <ul>
        ${(this.options || []).map(
          option => html`
            <li>
              <mwc-icon>${option.icon}</mwc-icon>
              ${option.name}
              <input name="context-option" type="radio" />
            </li>
          `
        )}
      </ul>
    `
  }
}
