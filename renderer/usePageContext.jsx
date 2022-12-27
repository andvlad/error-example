import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

const PageContext = createContext(undefined);

export const PageContextProvider = function({ pageContext, children }) {
  return (
    <PageContext.Provider value={pageContext}>
      {children}
    </PageContext.Provider>
  )
}

/*
  `usePageContext` allows us to access `pageContext` in any component.
  More infos: https://vite-plugin-ssr.com/pageContext-anywhere
 */
export function usePageContext() {
  const pageContext = useContext(PageContext);
  return pageContext;
}
