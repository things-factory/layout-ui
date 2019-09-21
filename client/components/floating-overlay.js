import { css, html, LitElement } from 'lit-element'
import { ScrollbarStyles } from '@things-factory/shell'

import '@material/mwc-icon'

class FloatingOverlay extends LitElement {
  static get properties() {
    return {
      backdrop: Boolean,
      direction: String,
      hovering: { type: String, reflect: true },
      size: String,
      name: String,
      title: String,
      closable: Boolean
    }
  }

  static get styles() {
    return [
      ScrollbarStyles,
      css`
        /* for layout style */
        :host {
          position: relative;
          z-index: 1;
        }

        :host([hovering='edge']) {
          /* edge hovering 인 경우에는 상위 relative position 크기와 위치를 반영한다. */
          position: initial;
        }

        #backdrop {
          position: fixed;
          left: 0;
          top: 0;

          width: 100vw;
          height: 100vh;

          background-color: var(--overlay-background-color);
        }

        [overlayed] {
          position: absolute;

          display: flex;
          flex-direction: column;
        }

        [overlayed][hovering='center'] {
          position: fixed;

          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        [hovering='center'] {
          width: var(--overlay-center-normal-width, 60%);
          height: var(--overlay-center-normal-height, 60%);
        }

        [hovering='center'][size='small'] {
          width: var(--overlay-center-small-width, 40%);
          height: var(--overlay-center-small-height, 40%);
        }

        [hovering='center'][size='large'] {
          width: var(--overlay-center-large-width, 100%);
          height: var(--overlay-center-large-height, 100%);
        }

        ::slotted(*) {
          box-sizing: border-box;
        }

        [content] {
          flex: 1;

          overflow: hidden;
        }

        [hovering='center'] [content] ::slotted(*) {
          width: 100%;
          height: 100%;
        }

        [direction='down'] {
          top: 0;

          width: 100%;
          max-height: 50vh;
        }

        [direction='down'] [content] {
          overflow-y: auto;
        }

        [direction='up'] {
          bottom: 0;

          width: 100%;
          max-height: 50vh;
        }

        [direction='up'] [content] {
          overflow-y: auto;
        }

        [direction='left'] {
          right: 0;

          height: 100%;
          max-width: 50vw;
        }

        [direction='left'] [content] {
          overflow-x: auto;
        }

        [direction='right'] {
          left: 0;

          height: 100%;
          max-width: 50vw;
        }

        [direction='right'] [content] {
          overflow-x: auto;
        }

        @media screen and (max-width: 460px) {
          [direction='down'] {
            max-height: 100vh;
          }

          [direction='up'] {
            max-height: 100vh;
          }

          [direction='left'] {
            max-width: 100vw;
          }

          [direction='right'] {
            max-width: 100vw;
          }

          [hovering='center'] {
            --overlay-center-small-width: 100%;
            --overlay-center-small-width: 100%;
            --overlay-center-normal-width: 100%;
            --overlay-center-normal-width: 100%;
            --overlay-center-large-width: 100%;
            --overlay-center-large-width: 100%;
          }
        }
      `,
      css`
        /* for header style */
        [header] {
          display: flex;
          flex-direction: row;
          align-items: center;

          background-color: var(--overlay-header-background-color);
          color: var(--overlay-header-color);
        }

        slot[name='header'] {
          flex: 1;

          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
        }

        [name='header']::slotted(*) {
          margin: 0 auto;
        }

        [name='header'] > h1 {
          text-transform: capitalize;
          font: var(--overlay-header-font);
        }

        [historyback] {
          margin-right: auto;
        }

        [close] {
          margin-left: auto;
        }

        [historyback],
        [close] {
          display: none;
        }

        [closable][close] {
          display: block;
        }

        @media screen and (max-width: 460px) {
          [closable][historyback] {
            display: block;
          }

          [closable][close] {
            display: none;
          }
        }
      `
    ]
  }

  render() {
    var direction = this.hovering == 'center' ? false : this.direction

    return html`
      ${Boolean(this.backdrop)
        ? html`
            <div id="backdrop" ?hidden=${!this.backdrop} @click=${this.onClose.bind(this)}></div>
          `
        : html``}

      <div
        overlayed
        hovering=${this.hovering || 'center'}
        direction=${direction}
        size=${this.size || 'normal'}
        @close-overlay=${this.onClose.bind(this)}
      >
        <div header>
          <mwc-icon @click=${this.onClose.bind(this)} ?closable=${this.closable} historyback>arrow_back</mwc-icon>
          <slot name="header">
            ${this.title
              ? html`
                  <h1>${this.title}</h1>
                `
              : html``}</slot
          >
          <mwc-icon @click=${this.onClose.bind(this)} ?closable=${this.closable} close>close</mwc-icon>
        </div>

        <div content>
          <slot> </slot>
        </div>
      </div>
    `
  }

  disconnectedCallback() {
    document.dispatchEvent(
      new CustomEvent('overlay-closed', {
        detail: this.name
      })
    )

    super.disconnectedCallback()
  }

  onClose() {
    /* 현재 overlay state를 확인해서, 자신이 포함하고 있는 템플릿인 경우에 history.back() 한다. */

    var state = history.state
    var overlay = (state || {}).overlay

    overlay && overlay.name == this.name && history.back()
  }
}

customElements.define('floating-overlay', FloatingOverlay)
