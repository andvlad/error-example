import { PageContextProvider } from './usePageContext'
import './PageShell.css'

export function PageShell({ pageContext, children }) {
  return (
    <PageContextProvider pageContext={pageContext}>
      {children}
    </PageContextProvider>
  )
}
