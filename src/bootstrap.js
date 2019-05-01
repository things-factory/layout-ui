import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js'

import { store } from '@things-factory/shell'

import { updateLayout, APPEND_FOOTERBAR, TOOL_POSITION } from '@things-factory/layout-base'

import { html } from 'lit-html'

export default function bootstrap() {
  installMediaQueryWatcher(`(min-width: 460px)`, matches => store.dispatch(updateLayout(matches)))

  import('../src/layouts')

  store.dispatch({
    type: APPEND_FOOTERBAR,
    footer: {
      template: html`
        <mwc-icon style="padding: 10px; background-color: #CF4545; color: white;" @click=${e => console.log('test')}
          >print</mwc-icon
        >
      `,
      position: TOOL_POSITION.FRONT,
      context: 'printable'
    }
  })

  // import('./layout/page-context-bar')
  // store.dispatch({
  //   type: APPEND_FOOTERBAR,
  //   footer: {
  //     template: html`
  //       <page-context-bar></page-context-bar>
  //     `,
  //     position: TOOL_POSITION.FRONT,
  //     context: 'actions'
  //   }
  // })
}
