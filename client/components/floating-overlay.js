import { css, html, LitElement } from 'lit-element'

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
      css`
        :host {
          position: relative;
        }

        #backdrop {
          position: fixed;
          left: 0;
          top: 0;

          width: 100vw;
          height: 100vh;

          background-color: var(--overlay-background-color);
        }

        slot {
          display: block;
          position: absolute;
        }

        slot[hovering='edge'] {
          position: fixed;
        }

        slot[direction='down'] {
          top: 0;

          width: 100%;
          max-height: 50vh;
        }

        slot[direction='up'] {
          bottom: 0;

          width: 100%;
          max-height: 50vh;
        }

        slot[direction='left'] {
          right: 0;

          height: 100%;
          max-width: 50vh;
        }

        slot[direction='right'] {
          left: 0;

          height: 100%;
          max-width: 50vh;
        }
      `
    ]
  }

  render() {
    return html`
      ${Boolean(this.backdrop)
        ? html`
            <div id="backdrop" ?hidden=${!this.backdrop} @click=${this.onBackdropClick.bind(this)}></div>
          `
        : html``}

      <slot direction=${this.direction} hovering=${this.hovering || 'next'}> </slot>
    `
  }

  onBackdropClick(event) {
    history.back()
    // this.dispatchEvent(new CustomEvent('close-overlay'))
  }
}

customElements.define('floating-overlay', FloatingOverlay)
