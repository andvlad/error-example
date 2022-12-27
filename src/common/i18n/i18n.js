import { atom } from 'nanostores';
import { createI18n } from '@nanostores/i18n';
import fetch from 'cross-fetch';

export const locale = atom('en');

export const i18n = createI18n(locale, {
  async get(code) {
    return fetch(`/translations/${code}.json`)
  }
})
