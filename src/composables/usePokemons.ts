import type { Pokemon } from '@/interface/pokemon';
import getPokemons from '@/logic/pokemonAPI';
import {
  getPokemonToGuess,
  checkIfCorrectGuess,
  messageGuess,
} from '@/logic/pokemonUtils';
import { usePokemonStore } from '@/stores/pokemon';
import { storeToRefs } from 'pinia';
import pokeApi from '@/logic/api/axiosConfig.js';
import { fa } from 'vuetify/locale';

export const usePokemoms = () => {
  const pokemonStore = usePokemonStore();
  const {
    pokemonOptionsList,
    hasTried,
    hasGuessedCorrectly,
    message,
    pokemonId,
  } = storeToRefs(pokemonStore);
  let apiResult: Pokemon[];
  // const pokemonOptionsList = ref<Pokemon[]>([]);
  // const hasTried = ref(false);
  // const hasGuessedCorrectly = ref(false);
  // const message = ref('');
  // const pokemonId = ref();
  let pokemonToGuess: Pokemon;

  async function init() {
    apiResult = await getPokemons(pokeApi);
    // pokemonOptionsList.value = apiResult;
    pokemonStore.loadPokemons(apiResult);
    console.log(pokemonOptionsList);
    pokemonToGuess = getPokemonToGuess(pokemonOptionsList.value);
    // pokemonId.value = pokemonToGuess.id;
    pokemonStore.setPokemonToGuess(pokemonToGuess.id);
    // hasGuessedCorrectly.value = false;
    // hasTried.value = false;
    // message.value = '';
    pokemonStore.setGuess(false, false, '');
  }

  function checkAnswer(guess: string) {
    const hasTriedBool = true;
    const hasGuessedCorrectlyBool = checkIfCorrectGuess(
      guess,
      pokemonToGuess.name
    );
    const newMessage = messageGuess(
      hasGuessedCorrectlyBool,
      pokemonToGuess.name
    );
    pokemonStore.setGuess(hasGuessedCorrectlyBool, hasTriedBool, newMessage);
  }

  async function newGame() {
    pokemonStore.clearState();
    await init();
  }

  return {
    pokemonOptionsList,
    hasTried,
    hasGuessedCorrectly,
    message,
    pokemonId,
    init,
    checkAnswer,
    newGame,
  };
};
