import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const defaultLocale = process.env.VUE_APP_I18N_LOCALE || "fr";

export const i18n = new VueI18n({
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  messages: {
    en: require(`./locales/en.json`),
    fr: require(`./locales/fr.json`),
  },
});
