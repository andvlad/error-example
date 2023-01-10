//import { useStore } from '@nanostores/preact'
import { useStore } from '@src/common/hooks'
import { messages } from './index.translation'
import { Counter } from './Counter'

function Page() {
  const t = useStore(messages);

  return (
    <>
      <h1>{t.welcome}</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Counter />
        </li>
      </ul>
    </>
  )
}

export { Page }
