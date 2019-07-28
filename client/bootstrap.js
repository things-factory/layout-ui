import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js'

import { updateLayout } from '@things-factory/layout-base'

import './layouts'

export default function bootstrap() {
  installMediaQueryWatcher(`(min-width: 460px)`, matches => updateLayout(matches))
}
