import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Pokemon } from '@/interface/pokemon';

interface PokemonState {
  pokemonOptionsList: Pokemon[];
  hasTried: boolean;
  hasGuessedCorrectly: boolean;
  message: string;
  pokemonId: number;
}

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemonOptionsList = ref<Pokemon[]>([]);
  const hasTried = ref(false);
  const hasGuessedCorrectly = ref(false);
  const message = ref('');
  const pokemonId = ref();

  function loadPokemons(pokemons: Pokemon[]) {
    pokemonOptionsList.value = pokemons;
  }

  function setPokemonToGuess(id: number) {
    pokemonId.value = id;
  }

  function setGuess(
    hasGuessedCorrectlyBool: boolean,
    hasTriedBool: boolean,
    messageToSet: string
  ) {
    hasTried.value = hasTriedBool;
    hasGuessedCorrectly.value = hasGuessedCorrectlyBool;
    message.value = messageToSet;
  }

  function clearState() {
    pokemonOptionsList.value = [];
    hasTried.value = false;
    hasGuessedCorrectly.value = false;
    message.value = '';
    pokemonId.value = 0;
  }

  return {
    pokemonOptionsList,
    hasTried,
    hasGuessedCorrectly,
    message,
    pokemonId,
    loadPokemons,
    setGuess,
    setPokemonToGuess,
    clearState,
  };
});
