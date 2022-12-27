import { hydrate, render as _render } from 'preact';
import { PageShell } from './PageShell';

import { i18n } from '@src/common/i18n';
import { translationsLoading } from "@nanostores/i18n";

function getPageTitle(pageContext) {
  const title =
    (pageContext.exports.documentProps || {}).title // For static titles (defined in the `export { documentProps }` of the page's `.page.js`)
    || (pageContext.documentProps || {}).title // For dynamic tiles (defined in the `export addContextProps()` of the page's `.page.server.js`)
    || 'test'

  return title;
}

export async function render(pageContext) {
  const { Page, pageProps } = pageContext;
  const container = document.querySelector('body');

  const page = (
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  )

  if (i18n.loading.get()) {
    await translationsLoading(i18n);
  }

  if (pageContext.isHydration) {
    hydrate(page, container);
  } else {
    _render(page, container);
  }

  document.title = getPageTitle(pageContext);
}

export const clientRouting = true;
export const prefetchStaticAssets = window.matchMedia('(any-hover: none)').matches
  ? { when: "VIEWPORT" }
  : { when: "HOVER" }
