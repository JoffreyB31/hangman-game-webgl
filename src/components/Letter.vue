<template>
  <div
    class="letter"
    :class="{
      'letter-active': active,
      'letter-error': error,
    }"
    @click="$emit('clicked', letter)"
  >
    {{ letter.toUpperCase() }}
  </div>
</template>

<script>
export default {
  name: "LetterComponent",

  props: {
    letter: { type: String, required: true },
    active: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" scoped>
.letter {
  font-size: $keyboardLetterSize;
  width: $keyboardLetterSize;
  align-items: center;
  align-content: center;
  padding: $keyboardLetterSize;
  margin: 5px;
  border-radius: 7px;
  background-image: linear-gradient(to right, $keyboardColor1, $keyboardColor2);
  background-attachment: fixed;
  color: white;
  cursor: pointer;
  text-align: center;
  box-shadow: 0px 2px 0 $darkGray;

  &:hover {
    background-image: linear-gradient(
      to right,
      $keyboardColor2,
      $keyboardColor1
    );
  }

  &.letter-active {
    background-image: none;
    background-color: $greenColor;
  }

  &.letter-error {
    background-color: $redColor;
  }
}
</style>
