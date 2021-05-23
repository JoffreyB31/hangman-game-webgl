<template>
  <div class="display-letter" :class="{ 'display-letter-visible': visible }">
    {{ visible ? letter.toUpperCase() : "" }}
  </div>
</template>

<script>
export default {
  name: "DisplayLetterComponent",

  props: {
    letter: { type: String, required: true },
    visible: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" scoped>
.display-letter {
  width: $displayLetterSize;
  min-height: $displayLetterSize;
  align-items: center;
  align-content: center;
  padding: $displayLetterSize/2;
  font-size: $displayLetterSize;
  margin-right: 20px;
  color: black;
  text-align: center;
  border-bottom: 5px solid $keyboardColor1;

  &:last-child {
    margin-right: 0;
  }
}
</style>
