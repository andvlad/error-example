import { atom } from 'nanostores';
import { createI18n } from '@nanostores/i18n';
import fetch from 'cross-fetch';

const isBrowser = typeof window !== 'undefined';
const initialLocale = isBrowser ? window.initialLocale : 'en';
const initialCache = isBrowser ? JSON.parse(window.initialCache) : undefined;
export const locale = atom(initialLocale);

export const i18n = createI18n(locale, {
  async get(code) {
    if (initialCache && initialCache[code]) {
      return initialCache[code];
    }

    const response = fetch(`/translations/${code}.json`);
    return response.json();
  }
})
