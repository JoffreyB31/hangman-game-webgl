<template>
  <div>
    <div class="game-finished-text">
      {{ win ? $t("winMessage") : $t("loseMessage") }}
    </div>
    <div>
      <a class="app-button" @click="$emit('replay')">{{ $t("replay") }}</a>
      <router-link to="/" class="app-button">{{ $t("home") }}</router-link>
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
