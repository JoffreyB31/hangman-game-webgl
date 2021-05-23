<template>
  <div id="home">
    <h1>Jeu du pendu</h1>
    <router-link class="app-button" to="/play">Jouer</router-link>
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
}
</style>
