<template>
  <div class="keyboard-container">
    <div
      class="keyboard-letter"
      :class="{ 'keyboard-letter-active': k.active }"
      v-for="k in keyboard"
      :key="'keyboard-letter' + k.letter"
      @click="onLetterClick(k.letter)"
    >
      {{ k.letter.toUpperCase() }}
    </div>
  </div>
</template>

<script>
export default {
  name: "KeyboardComponent",

  data: () => ({
    alphabet: [..."abcdefghijklmnopqrstuvwxyz"],
    usedLetters: new Set(),
    keyboard: {},
  }),

  mounted() {
    this.updateKeyboard();
  },

  methods: {
    updateKeyboard() {
      this.keyboard = this.alphabet.map((letter) => {
        return { letter, active: this.isLetterActive(letter) };
      });
    },
    onLetterClick(letter) {
      this.$emit("letterClicked", letter);
      // this.usedLetters.add(letter);
      // this.updateKeyboard();
    },
    isLetterActive(letter) {
      return this.usedLetters.has(letter);
    },
  },
};
</script>

<style lang="scss" scoped>
.keyboard-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 80%;
  min-width: 500px;
  margin: 0 auto;

  .keyboard-letter {
    font-size: $keyboardFontSize;
    width: 2%;
    align-items: center;
    align-content: center;
    padding: $keyboardFontSize/2;
    margin: 5px;
    border-radius: 10px;
    background-image: linear-gradient(
      to right,
      $keyboardColor1,
      $keyboardColor2
    );
    background-attachment: fixed;
    color: white;
    cursor: pointer;
    text-align: center;
    box-shadow: 2px 2px 0 rgb(99, 99, 99),
      inset 0 5px 3px rgba(255, 255, 255, 0.1);

    &:hover {
      background-image: linear-gradient(
        to right,
        $keyboardColor2,
        $keyboardColor1
      );
    }

    &.keyboard-letter-active {
      background-image: none;
      background-color: rgb(44, 44, 44);
    }
  }
}
</style>
