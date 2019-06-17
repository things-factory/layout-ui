import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js'

import { store } from '@things-factory/shell'

import { updateLayout } from '@things-factory/layout-base'

export default function bootstrap() {
  import('./layouts')
  installMediaQueryWatcher(`(min-width: 460px)`, matches => store.dispatch(updateLayout(matches)))
}
