<template>
  <div id="home">
    <h1>Jeu du pendu</h1>
    <router-link to="/play">Jouer</router-link>
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

  a {
    text-decoration: none;
    padding: 12px 30px;
    margin: 5px;
    border-radius: 7px;
    background-color: $keyboardColor1;
    color: white;
    cursor: pointer;
    text-align: center;
    transition: all 250ms ease-in-out;

    &:hover {
      background-color: $keyboardColor2;
    }
  }
}
</style>
