import renderToString from 'preact-render-to-string';
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr';

import { locale as localeStore } from '@src/common/i18n';

import { PageShell } from './PageShell';
import logoUrl from './logo.svg';

// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = [
  'documentProps',
  'pageProps',
  'locale',
  'routeParams',
]

export async function render(pageContext) {
  const { Page, pageProps, documentProps, locale } = pageContext;
  const title = documentProps?.title || 'test';
  const desc = documentProps?.description || 'test';
  const cache = JSON.stringify(i18n.cache);

  localeStore.set(locale);

  const pageHtml = renderToString(
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>,
  )

  // See https://vite-plugin-ssr.com/head
  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="${locale}">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <link rel="preload" href="/static/fonts/NotoSans-Regular.ttf" as="font" type="font/ttf" crossorigin>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <script>
        window.initialLocale = '${locale}';
        window.initialCache = '${dangerouslySkipEscape(cache)}';
      </script>
      <body>
        ${dangerouslySkipEscape(pageHtml)}
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    },
  }
}
