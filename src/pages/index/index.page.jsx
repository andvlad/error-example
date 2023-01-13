import { useCallback } from 'preact/hooks';
//import { useStore } from '@nanostores/preact'
import { useStore } from '@src/common/hooks'
import { locale as localeStore } from '@src/common/i18n'
import { messages } from './index.translation'
import { Counter } from './Counter'

function Page() {
  const t = useStore(messages);
  const locale = useStore(localeStore);

  const onChangeCallback = useCallback(
    (event) => {
      localeStore.set(event.target.value)
    },
    [localeStore]
  )

  return (
    <>
      <h1>{t.welcome}</h1>
      <select defaultValue={locale} onChange={onChangeCallback}>
        <option value='en'>EN</option>
        <option value='ru'>RU</option>
      </select>
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
