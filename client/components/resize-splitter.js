import { LitElement, html, css } from 'lit-element'

export class ResizeSplitter extends LitElement {
  static get dragImage() {
    if (!ResizeSplitter._dragImage) {
      ResizeSplitter._dragImage = new Image()
      ResizeSplitter._dragImage.src =
        'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
    }
    return ResizeSplitter._dragImage
  }

  static get styles() {
    return css`
      :host {
        position: relative;
        opacity: 0.7;
        background-color: var(--splitter-background-color);
      }

      :host(:hover) {
        background-color: var(--splitter-hover-background-color);
      }

      div {
        position: absolute;
        width: 100%;
        height: 100%;
      }
    `
  }

  static get properties() {
    return {}
  }

  connectedCallback() {
    super.connectedCallback()

    if (this.hasAttribute('vertical')) {
      this.style.width = '3px'
      this.style.height = '100%'
      this.style.cursor = 'col-resize'
    } else {
      this.style.width = '100%'
      this.style.height = '3px'
      this.style.cursor = 'row-resize'
    }
  }

  render() {
    return html`
      <div
        draggable="true"
        @dragstart=${e => this._onDragStart(e)}
        @drag=${this._throttled(100, this._onDrag.bind(this))}
        @dragend=${e => this._onDragEnd(e)}
      ></div>
    `
  }

  // TODO onDrag 이벤트가 계속 발생하므로 처리하는 성능 저하됨. 그래서 throttling 하도록 함
  _throttled(delay, fn) {
    let lastCall = 0
    return function(...args) {
      const now = new Date().getTime()
      if (now - lastCall < delay) {
        return
      }
      lastCall = now
      return fn(...args)
    }
  }

  _onDragStart(e) {
    e.dataTransfer.setDragImage(ResizeSplitter.dragImage, 0, 0)

    this.dragstart = {
      x: e.clientX,
      y: e.clientY
    }

    this.dispatchEvent(
      new CustomEvent('splitter-dragstart', {
        bubbles: true,
        composed: true
      })
    )

    e.stopPropagation()
  }

  _onDrag(e) {
    if (e.clientX == 0) {
      return
    }

    this.dispatchEvent(
      new CustomEvent('splitter-drag', {
        bubbles: true,
        composed: true,
        detail: {
          x: e.clientX - this.dragstart.x,
          y: e.clientY - this.dragstart.y
        }
      })
    )

    e.stopPropagation()
  }

  _onDragEnd(e) {
    this.dispatchEvent(
      new CustomEvent('splitter-dragend', {
        bubbles: true,
        composed: true,
        detail: {
          x: e.clientX - this.dragstart.x,
          y: e.clientY - this.dragstart.y
        }
      })
    )

    e.stopPropagation()
  }
}

customElements.define('resize-splitter', ResizeSplitter)
