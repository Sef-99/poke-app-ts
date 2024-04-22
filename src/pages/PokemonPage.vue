<template lang="">
  <div class="progress-container" v-if="!pokemonId">
    <v-progress-circular indeterminate></v-progress-circular>
  </div>

  <div v-else>
    <h1>Who's the Pokemón?</h1>
    <PokemonPictures :pokemon-id="pokemonId" :has-guessed="hasTried" />
    <PokemonOptions
      :pokemon-array="pokemonOptionsList"
      :hasTried="hasTried"
      @selection="checkAnswer($event)"
    />
    <div v-if="message" class="fade-in">
      <h1>{{ message }}</h1>
      <v-container fluid>
        <v-row justify="center">
          <v-btn @click="newGame">Play Again</v-btn>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import PokemonOptions from '@/components/PokemonOptions.vue';
import PokemonPictures from '@/components/PokemonPictures.vue';
import { ref, reactive, onMounted } from 'vue';
import getPokemons from '@/logic/pokemonAPI.js';
import {
  checkIfCorrectGuess,
  getPokemonToGuess,
  messageGuess,
} from '@/logic/pokemonUtils.js';
import pokeApi from '@/logic/api/axiosConfig.js';
import type { Pokemon } from '@/interface/pokemon';
import { usePokemonStore } from '@/stores/pokemon';
import { storeToRefs } from 'pinia';
import { usePokemoms } from '@/composables/usePokemons';

// const pokemonStore = usePokemonStore();
// const {
//   pokemonOptionsList,
//   hasTried,
//   hasGuessedCorrectly,
//   message,
//   pokemonId,
// } = storeToRefs(pokemonStore);
// let apiResult: Pokemon[];
// // const pokemonOptionsList = ref<Pokemon[]>([]);
// // const hasTried = ref(false);
// // const hasGuessedCorrectly = ref(false);
// // const message = ref('');
// // const pokemonId = ref();
// let pokemonToGuess: Pokemon;

const {
  pokemonOptionsList,
  hasTried,
  hasGuessedCorrectly,
  message,
  pokemonId,
  init,
  checkAnswer,
  newGame,
} = usePokemoms();

onMounted(async () => {
  init();
});

defineExpose({
  init,
});
</script>
<style>
h1 {
  text-align: center;
  margin-bottom: 25px;
  margin-top: 25px;
}

v-btn {
  justify-self: center;
}

.progress-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full height of the viewport */
}
</style>
