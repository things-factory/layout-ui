import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js'

import { store } from '@things-factory/shell'

import { updateLayout, APPEND_FOOTERBAR, TOOL_POSITION } from '@things-factory/layout-base'

export default function bootstrap() {
  installMediaQueryWatcher(`(min-width: 460px)`, matches => store.dispatch(updateLayout(matches)))
}
