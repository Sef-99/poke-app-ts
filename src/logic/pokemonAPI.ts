'use strict';

import type { Pokemon } from '@/interface/pokemon';
import type { AxiosInstance } from 'axios';

const max = 649;
const min = 1;
const randomJSObject = Math.random;

async function getPokemons(pokeApi: AxiosInstance) {
  const idOfPokemonToGet = generateUniqueRandomNumbers(randomJSObject);
  const listOfPokemon: Pokemon[] = [];
  for (const id of idOfPokemonToGet) {
    const { data: pokemonData } = await pokeApi.get(`/pokemon/${id}`);
    const pokemon: Pokemon = {
      id: pokemonData.id,
      name: pokemonData.name,
    };
    listOfPokemon.push(pokemon);
  }
  return listOfPokemon;
}

export function generateUniqueRandomNumbers(randomJSObject: () => number) {
  const amountOfNumbers = 4;
  let numbers = new Set();
  while (numbers.size < amountOfNumbers) {
    let randomNumber = Math.floor(randomJSObject() * (max - min + 1)) + min;
    numbers.add(randomNumber);
  }
  return Array.from(numbers);
}

export default getPokemons;
