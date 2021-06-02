<template>
  <div class="locale-switcher">
    <span
      v-for="locale in locales"
      :key="locale.name"
      class="app-button locale-button"
      :class="{ 'locale-active': activeLocale === locale.name }"
      @click="changeLocale(locale.name)"
    >
      {{ locale.text }}
    </span>
  </div>
</template>

<script>
export default {
  name: "NavComponent",

  data: () => ({
    locales: [
      { name: "fr", text: "Français" },
      { name: "en", text: "English" },
    ],
  }),

  computed: {
    activeLocale() {
      return this.$i18n.locale;
    },
  },
  methods: {
    changeLocale(localeName) {
      this.$i18n.locale = localeName;
    },
  },
};
</script>

<style lang="scss" scoped>
.locale-switcher {
  background-color: $primary;
  display: flex;
  justify-content: flex-end;

  .locale-button {
    padding: 5px 20px !important;

    &.locale-active {
      background-color: $white !important;
      color: $primary !important;
      cursor: default !important;
    }
  }
}
</style>
