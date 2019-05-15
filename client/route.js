export default function route(page) {
  switch (page) {
    case 'layout-ui-main':
      import('./pages/main')
      return page
  }
}
