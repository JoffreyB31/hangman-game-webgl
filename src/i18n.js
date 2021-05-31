import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const defaultLocale = process.env.VUE_APP_I18N_LOCALE || "fr";
const includedLanguage = require(`./locales/${defaultLocale}.json`);

// set <html lang="fr" />
document.documentElement.setAttribute("lang", defaultLocale);

export const i18n = new VueI18n({
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  messages: {
    [defaultLocale]: includedLanguage,
  },
});

// all the other languages, these will be loaded as chunks via webpack
const messages = {
  // () => import() creates a chunk in the /html/js/chunks folder with the
  // given webpackChunkName in the comment. Returns a promise
  en: () => import(/* webpackChunkName: 'en' */ "./locales/en.json"),
  fr: () => import(/* webpackChunkName: 'nl' */ "./locales/fr.json"),
};

// load our language chunk and set our language after request
// will refresh the views with the new language immediately
export function loadLanguage(lang) {
  return messages[lang]().then((i18nMessages) => {
    i18n.setLocaleMessage(lang, i18nMessages);
    i18n.locale = lang;
    document.documentElement.setAttribute("lang", lang);
  });
}
