<template>
  <div id="home">
    <div class="home-container">
      <h1 class="home-title">{{ $t("hangman") }}</h1>
      <VerticalDivider />
    </div>
    <p class="home-description" v-html="$t('hangmanGameDescription')" />
    <router-link class="app-button" to="/play">{{ $t("play") }}</router-link>
  </div>
</template>

<script>
import VerticalDivider from "@/components/VerticalDivider.vue";
export default {
  name: "HomeView",
  components: { VerticalDivider },
};
</script>

<style lang="scss" scoped>
#home {
  text-align: center;
  position: relative;

  .home-title {
    margin: 0;
    padding: $normalGap;
    color: $white;
    background-color: $primary;
  }

  .home-container {
    background-color: $primary;
  }

  .home-description {
    max-width: 600px;
    margin: 0 auto;
    text-align: left;

    @include sm {
      margin: 0 auto;
      padding: 0 $smallGap;
    }
  }
}
</style>
