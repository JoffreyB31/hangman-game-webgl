<template>
  <div
    class="display-letter"
    :class="{
      'display-letter-visible': visible && !isSpecialCharacter,
    }"
  >
    {{ visible || isSpecialCharacter ? letter.toUpperCase() : "_" }}
  </div>
</template>

<script>
export default {
  name: "DisplayLetterComponent",

  props: {
    letter: { type: String, required: true },
    visible: { type: Boolean, default: false },
    isSpecialCharacter: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" scoped>
.display-letter {
  width: $displayLetterSize;
  align-items: center;
  align-content: center;
  padding: $displayLetterSize/2;
  font-size: $displayLetterSize;
  margin: 5px;
  color: black;
  text-align: center;

  &.display-letter-hidden {
    background-color: rgb(44, 44, 44);
  }
}
</style>
