<template>
  <div id="app">
    <Nav />
    <router-view />
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
export default {
  name: "App",
  components: { Nav },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");

body {
  margin: 0;
}

#app {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: "100vw";
  height: "100vh";

  .app-button {
    text-decoration: none;
    padding: 12px 30px;
    margin: 5px;
    border-radius: 7px;
    color: $white;
    background-color: $primary;
    cursor: pointer;
    text-align: center;
    transition: all 250ms ease-in-out;

    &:hover {
      color: $primary;
      background-color: white;
    }
  }
}
</style>
