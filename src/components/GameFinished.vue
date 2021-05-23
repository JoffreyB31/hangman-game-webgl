<template>
  <div>
    <div class="game-finished-text">
      Vous avez {{ win ? "gagné" : "perdu" }}
    </div>
    <div>
      <a class="app-button" @click="$emit('replay')">Rejouer</a>
      <router-link to="/" class="app-button">Accueil</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameFinished",

  props: {
    win: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" scoped>
.game-finished-text {
  text-align: center;
  margin-bottom: 25px;
}
</style>
