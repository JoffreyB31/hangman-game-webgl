<template>
  <div id="play">
    <WordDisplay :word="word" />
    <Keyboard />
  </div>
</template>

<script>
import wordsJson from "@/assets/words.json";
import WordDisplay from "@/components/WordDisplay.vue";
import Keyboard from "@/components/Keyboard.vue";
export default {
  name: "PlayView",
  components: {
    Keyboard,
    WordDisplay,
  },
  data: () => ({
    word: undefined,
  }),
  mounted() {
    this.word = this.getRandomWord();
  },
  methods: {
    getRandomWord() {
      const wordsArray = wordsJson.values;
      return wordsArray[Math.floor(Math.random() * wordsArray.length)];
    },
  },
};
</script>

<style></style>
