import { css, html, LitElement } from 'lit-element'
import { ScrollbarStyles } from '@things-factory/shell'

class FloatingOverlay extends LitElement {
  static get properties() {
    return {
      backdrop: Boolean,
      direction: String,
      hovering: String
    }
  }

  static get styles() {
    return [
      ScrollbarStyles,
      css`
        :host {
          position: relative;
          z-index: 1;
        }

        #backdrop {
          position: fixed;
          left: 0;
          top: 0;

          width: 100vw;
          height: 100vh;

          background-color: var(--overlay-background-color);
        }

        ::slotted(*) {
          box-sizing: border-box;
        }

        slot {
          display: block;
        }

        slot[hovering='next'] {
          position: absolute;
        }

        slot[hovering='edge'] {
          position: sticky;
        }

        slot[hovering='center'] {
          position: fixed;

          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        slot[direction='down'] {
          top: 0;

          width: 100%;
          max-height: 50vh;
          overflow-y: auto;
        }

        slot[direction='up'] {
          bottom: 0;

          width: 100%;
          max-height: 50vh;
          overflow-y: auto;
        }

        slot[direction='left'] {
          right: 0;

          height: 100%;
          max-width: 50vw;
          overflow-x: auto;
        }

        slot[direction='right'] {
          left: 0;

          height: 100%;
          max-width: 50vw;
          overflow-x: auto;
        }

        @media screen and (max-width: 460px) {
          slot[direction='down'] {
            max-height: 100vh;
          }

          slot[direction='up'] {
            max-height: 100vh;
          }

          slot[direction='left'] {
            max-width: 100vw;
          }

          slot[direction='right'] {
            max-width: 100vw;
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

      <slot @close-overlay=${this.onClose.bind(this)} direction=${direction} hovering=${this.hovering || 'center'}>
      </slot>
    `
  }

  onClose() {
    history.back()
  }
}

customElements.define('floating-overlay', FloatingOverlay)
