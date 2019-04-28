import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js'

import { store } from '@things-factory/shell'

import { updateLayout } from '@things-factory/layout-base'

export default function bootstrap() {
  installMediaQueryWatcher(`(min-width: 460px)`, matches => store.dispatch(updateLayout(matches)))

  import('../src/layouts')
}
