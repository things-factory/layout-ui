import { LitElement, html, css } from 'lit-element'

import '@material/mwc-icon'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '@things-factory/shell'
import { TOOL_POSITION } from '@things-factory/layout-base'

class ContextToolbar extends connect(store)(LitElement) {
  static get properties() {
    return {
      _context: Object,
      _contextTools: Array
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          background-color: var(--context-toolbar-background-color, white);
          justify-content: space-between;
          padding: 0;
        }

        [center] {
          flex: 1;
          justify-content: center;
          align-items: center;
        }

        [center] > * {
          justify-content: center;
          align-items: center;
        }

        :host(*) {
          align-items: center;
          padding: 0px;
        }

        ::slotted(*) {
          align-items: center;
        }

        :host(.vline),
        ::slotted(.vline) {
          display: block;
          flex: none;
          border-left: 1px solid rgba(255, 255, 255, 0.07);
          border-right: 1px solid rgba(0, 0, 0, 0.1);
          width: 0px;
          height: 18px;
          margin: 0 4px;
        }

        :host(label),
        ::slotted(label) {
          margin-right: 5px;
          color: #fff;
          font-size: 20px;
        }

        slot {
          display: flex;
          flex-wrap: nowrap;
          height: 100%;
          align-items: center;
          overflow: hidden;
          padding: 0;
        }

        span.space {
          width: 10px;
        }
      `
    ]
  }

  render() {
    let contextKeys = Object.keys(this._context)
    let contextTools = (this._contextTools || []).filter(tool => {
      if (!tool.context || contextKeys.includes(tool.context)) return tool
    })

    let frontEndTools = contextTools.filter(tool => tool.position == TOOL_POSITION.FRONT_END)
    let frontTools = contextTools.filter(tool => tool.position == TOOL_POSITION.FRONT)
    let centerTools = contextTools.filter(tool => tool.position == TOOL_POSITION.CENTER)
    let rearTools = contextTools.filter(tool => tool.position == TOOL_POSITION.REAR)
    let rearEndTools = contextTools.filter(tool => tool.position == TOOL_POSITION.REAR_END)

    return html`
      <slot name="front-end"> </slot>
      ${frontEndTools.map(
        tool =>
          html`
            ${tool.template}
          `
      )}

      <slot name="front"> </slot>
      ${frontTools.map(
        tool =>
          html`
            ${tool.template}
          `
      )}

      <div center>
        <slot name="center"> </slot>
        ${centerTools.map(
          tool =>
            html`
              ${tool.template}
            `
        )}
      </div>

      <slot name="rear"> </slot>
      ${rearTools.map(
        tool =>
          html`
            ${tool.template}
          `
      )}

      <slot name="rear-end"> </slot>
      ${rearEndTools.map(
        tool =>
          html`
            ${tool.template}
          `
      )}
    `
  }

  stateChanged(state) {
    this._contextTools = state.layout.contextTools
    this._context = state.route.context
  }
}

customElements.define('context-toolbar', ContextToolbar)
