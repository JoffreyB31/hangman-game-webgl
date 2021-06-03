<template>
  <div
    class="letter"
    :class="{
      ['letter-' + letter]: true,
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
  background-image: linear-gradient(to right, $primary, $secondaray);
  background-attachment: fixed;
  color: $white;
  cursor: pointer;
  text-align: center;
  box-shadow: 0px 2px 0 $shadow;

  @include sm {
    width: $keyboardLetterSize/2;
    padding: $keyboardLetterSize/1.25;
  }

  &:hover {
    background-image: linear-gradient(to right, $secondaray, $primary);
  }

  &.letter-active {
    background-image: none;
    background-color: $green;
  }

  &.letter-error {
    background-color: $red;
  }
}
</style>
