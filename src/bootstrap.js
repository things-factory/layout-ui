import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js'

import { store } from '@things-factory/shell'

import { updateLayout, OPEN_SNACKBAR } from '@things-factory/layout-base'

export default function bootstrap() {
  import('../src/layouts')
  installMediaQueryWatcher(`(min-width: 460px)`, matches => store.dispatch(updateLayout(matches)))
  document.addEventListener('notify', function(e) {
    store.dispatch({
      type: OPEN_SNACKBAR,
      message: e.detail
    })
  })
}
