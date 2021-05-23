<template>
  <div id="play">
    <!-- <Animation /> -->
    <div class="flex-container display-container">
      <DisplayLetter
        v-for="(letter, idx) in word"
        :key="'letter-display-' + idx"
        :letter="letter"
        :end="gameState === GAME_STATE.LOSE || gameState === GAME_STATE.WIN"
        :is-special-char="isSpecialChar(letter)"
        :visible="isLetterUsed(letter) || isSpecialChar(letter)"
      />
    </div>

    <div class="flex-container counter-container">
      <p v-if="gameState === GAME_STATE.LOADING">Chargement des données</p>
      <GameFinished
        @replay="replay"
        v-else-if="gameState === GAME_STATE.WIN"
        win
      />
      <GameFinished
        @replay="replay"
        v-else-if="gameState === GAME_STATE.LOSE"
      />
      <p v-else>Essai restants : {{ lettersLeft }}</p>
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
import GameFinished from "@/components/GameFinished.vue";

export default {
  name: "PlayView",

  components: {
    Letter,
    DisplayLetter,
    GameFinished,
  },

  data: () => ({
    alphabet: [..."abcdefghijklmnopqrstuvwxyz"],
    specialCharacters: [...".-, "],
    GAME_STATE: Object.freeze({
      LOADING: "LOADING",
      WIN: "WIN",
      LOSE: "LOSE",
      PLAYING: "PLAYING",
    }),
    loading: false,
    dataUrl:
      "https://gist.githubusercontent.com/pleasemorecoffee/13e65c88e7ab65f88f13a01928632311/raw/59d0ba6a5ba865967cc2de2619300613bfd2f55c/pendu.json",
    dataWords: [],
    word: [],
    usedLetters: [], // Set not reactive with Vue2
    counter: 0,
  }),

  computed: {
    gameState() {
      if (this.loading) {
        return this.GAME_STATE.LOADING;
      } else if (
        this.word.every(
          (v) => this.isSpecialChar(v) || this.usedLetters.includes(v)
        )
      ) {
        return this.GAME_STATE.WIN;
      } else if (this.lettersLeft <= 0) {
        return this.GAME_STATE.LOSE;
      }
      return this.GAME_STATE.PLAYING;
    },

    lettersLeft() {
      return 7 - this.counter;
    },
  },

  async mounted() {
    if (this.dataWords.length === 0) {
      await this.fetchData();
    }
    // Split characters into array
    this.word = [...this.getRandomWord()].map((x) => x.toLowerCase());
  },

  methods: {
    replay() {
      this.usedLetters = [];
      this.counter = 0;
      const previousWord = this.word.join();
      let newWord;
      while (newWord === undefined || previousWord === newWord) {
        newWord = this.getRandomWord();
      }
      this.word = [...newWord].map((x) => x.toLowerCase());
    },

    async fetchData() {
      this.loading = true;
      return axios
        .get(this.dataUrl)
        .then((res) => {
          this.dataWords = res.data.values || [];
          this.loading = false;
        })
        .catch((err) => {
          console.error(err);
          this.loading = false;
        });
    },

    getRandomWord() {
      return this.dataWords[Math.floor(Math.random() * this.dataWords.length)];
    },

    onLetterClicked(letter) {
      if (this.gameState === this.GAME_STATE.PLAYING) {
        if (!this.usedLetters.includes(letter)) {
          this.usedLetters.push(letter);
        }

        if (!this.isLetterValid(letter)) {
          this.counter++;
        }
      }
    },

    isSpecialChar(letter) {
      return this.specialCharacters.includes(letter);
    },
    isLetterUsed(letter) {
      return this.usedLetters.includes(letter);
    },
    isLetterValid(letter) {
      return this.word.includes(letter);
    },
    isLetterError(letter) {
      return !this.isLetterValid(letter) && this.isLetterUsed(letter);
    },
  },
};
</script>

<style lang="scss" scoped>
.flex-container {
  display: flex;
  margin: 0 auto 50px auto;
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
