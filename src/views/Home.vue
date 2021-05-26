<template>
  <div id="home">
    <h1 class="home-title">{{ $t("hangman") }}</h1>
    <p class="home-description" v-html="$t('hangmanGameDescription')" />
    <router-link class="app-button" to="/play">{{ $t("play") }}</router-link>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style lang="scss" scoped>
#home {
  text-align: center;

  .home-description {
    max-width: 600px;
    margin: 50px auto;
    text-align: left;
  }
}
</style>
