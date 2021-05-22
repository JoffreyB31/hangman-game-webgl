<template>
  <div class="word-display-container">
    <div
      class="word-display-letter"
      v-for="(letter, index) in wordArray"
      :key="'word-display-' + index"
    >
      {{ letter.toUpperCase() }}
    </div>
  </div>
</template>

<script>
export default {
  name: "WordDisplayComponent",

  props: {
    word: { type: String, required: true },
  },

  computed: {
    wordArray() {
      return [...this.word];
    },
  },
};
</script>

<style lang="scss" scoped>
.word-display-container {
  display: flex;
  flex-wrap: nowrap;
  margin: 0 auto;
  justify-content: center;
  margin: 5em 0;

  .word-display-letter {
    font-size: $wordDisplayFontSize;
    width: 2%;

    padding: $keyboardFontSize/2;
    border: 5px solid black;
    margin: 5px;
    border-radius: 10px;
    color: black;
    text-align: center;
  }
}
</style>
