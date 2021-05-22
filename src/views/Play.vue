<template>
  <div id="play">
    <div class="flex-container display-container">
      <DisplayLetter
        v-for="(letter, idx) in word"
        :key="'letter-display-' + idx"
        :letter="letter"
        :visible="isLetterUsed(letter)"
        :is-special-character="isSpecialCharacter(letter)"
      />
    </div>

    <div class="flex-container counter-container">
      <p v-if="gameLose">Vous avez perdu</p>
      <p v-else>Essai restants : {{ counterLimit }}</p>
    </div>

    <div class="flex-container keyboard-container">
      <Letter
        v-for="letter in alphabet"
        :key="'letter-' + letter"
        :letter="letter"
        :error="isLetterError(letter)"
        :active="isLetterUsed(letter)"
        @clicked="onLetterClicked"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Letter from "@/components/Letter.vue";
import DisplayLetter from "@/components/DisplayLetter.vue";
export default {
  name: "PlayView",

  components: {
    Letter,
    DisplayLetter,
  },

  data: () => ({
    dataUrl:
      "https://gist.githubusercontent.com/pleasemorecoffee/13e65c88e7ab65f88f13a01928632311/raw/59d0ba6a5ba865967cc2de2619300613bfd2f55c/pendu.json",
    alphabet: [..."abcdefghijklmnopqrstuvwxyz"],
    specialCharacters: [...".-, "],
    words: [],
    word: "",
    usedLetters: [],
    counter: 0,
  }),

  computed: {
    gameLose() {
      return this.counterLimit === 0;
    },

    counterLimit() {
      return 7 - this.counter;
    },
  },

  async mounted() {
    if (this.words.length === 0) {
      await this.fetchData();
    }
    this.word = [...this.getRandomWord()].map((x) => x.toLowerCase());
  },

  methods: {
    async fetchData() {
      return axios
        .get(this.dataUrl)
        .then((res) => {
          this.words = res.data.values || [];
          // Split each characters into an array
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getRandomWord() {
      return this.words[Math.floor(Math.random() * this.words.length)];
    },
    isSpecialCharacter(letter) {
      return this.specialCharacters.includes(letter);
    },
    isLetterError(letter) {
      return !this.word.includes(letter) && this.isLetterUsed(letter);
    },
    isLetterUsed(letter) {
      return this.usedLetters.includes(letter);
    },
    onLetterClicked(letter) {
      if (!this.usedLetters.includes(letter)) {
        this.usedLetters.push(letter);
      }

      if (!this.word.includes(letter)) {
        this.counter++;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.flex-container {
  display: flex;
  margin: 0 auto 25px auto;
}

.display-container {
  flex-wrap: nowrap;
  max-width: 90%;
  justify-content: center;
}

.counter-container {
  justify-content: center;
}

.keyboard-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 80%;
  min-width: 500px;
}
</style>
