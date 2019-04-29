import { connect } from 'pwa-helpers/connect-mixin'
import { LitElement, html, css } from 'lit-element'

import { store } from '@things-factory/shell'
import { TOOL_POSITION } from '@things-factory/layout-base'

class PageContextBar extends connect(store)(LitElement) {
  static get properties() {
    return {
      _footers: Array
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          border-top: 1px solid gray;
        }
        :host(*) {
          align-items: center;
        }
      `
    ]
  }

  render() {
    var frontContextTools = this._footers.filter(
      tool => tool.position == TOOL_POSITION.FRONT_END || tool.position == TOOL_POSITION.FRONT
    )
    var rearContextTools = this._footers.filter(
      tool => tool.position == TOOL_POSITION.REAR_END || tool.position == TOOL_POSITION.REAR
    )

    return html`
      <page-context-selector></page-context-selector>

      <slot name="front"></slot>
      ${frontContextTools.map(
        tool => html`
          <div @click="${this.onContextSelect}">
            ${tool.template}
          </div>
        `
      )}

      <slot name="rear"></slot>
      ${rearContextTools.map(
        tool => html`
          <div @click="${this.onContextSelect}">
            ${tool.template}
          </div>
        `
      )}
    `
  }

  onContextSelect(e) {
    console.log(e)
  }

  stateChanged(state) {
    this._footers = state.layout.footers
  }
}

customElements.define('page-context-bar', PageContextBar)
