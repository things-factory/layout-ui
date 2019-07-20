import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js'

import { updateLayout } from '@things-factory/layout-base'

export default function bootstrap() {
  import('./layouts')
  installMediaQueryWatcher(`(min-width: 460px)`, matches => updateLayout(matches))
}
