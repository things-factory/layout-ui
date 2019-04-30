import { LitElement, html, css } from 'lit-element'

import '@material/mwc-icon/mwc-icon'
import '@material/mwc-button/mwc-button'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '@things-factory/shell'
import { TOOL_POSITION } from '@things-factory/layout-base'

class AppToolbar extends connect(store)(LitElement) {
  static get properties() {
    return {
      _context: Object,
      _appTools: Array
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          background-color: var(--primary-dark-color);
          justify-content: space-between;
          height: var(--toolbar-height, 45px);
          padding: 0;
          color: var(--third-color);
        }

        [name='center'] {
          flex: 1;
          justify-content: center;
          align-items: center;
        }

        :host(*) {
          align-items: center;
          padding: 0 10px 0 10px;
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
    var appTools = this._appTools || []

    var frontEndTools = appTools.filter(tool => tool.position == TOOL_POSITION.FRONT_END)
    var frontTools = appTools.filter(tool => tool.position == TOOL_POSITION.FRONT)
    var centerTools = appTools.filter(too => too.position == TOOL_POSITION.CENTER)
    var rearTools = appTools.filter(tool => tool.position == TOOL_POSITION.REAR)
    var rearEndTools = appTools.filter(tool => tool.position == TOOL_POSITION.REAR_END)

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

      <slot name="center">
        ${this._context
          ? html`
              <label>${this._context.title}</label>
            `
          : html``}
      </slot>
      ${centerTools.map(
        tool =>
          html`
            ${tool.template}
          `
      )}

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
    this._appTools = state.layout.appTools
    this._context = state.route.context
  }
}

customElements.define('app-toolbar', AppToolbar)
