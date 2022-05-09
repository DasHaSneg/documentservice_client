import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import * as locales from './languages';

let resources = {};
Object.keys(locales).forEach( (key) => { 
  resources[key] = {translation: locales[key]};
})

i18n.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: 'ru-ru',
		debug: true,
		detection: {
			order: ['queryString', 'cookie'],
			cache: ['cookie'],
		},
		interpolation: {
			escapeValue: false,
		},
		react: {
			wait: true,
		},
	});

export function strings(name, params = {}) {
	return i18n.t(name, params);
}

export function setLocale(locale) {
	i18n.changeLanguage(locale);
}
export default i18n;