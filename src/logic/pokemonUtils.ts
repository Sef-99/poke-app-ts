'use strict';

import { type Pokemon } from '@/interface/pokemon';

export function getPokemonToGuess(listOfPokemon: Pokemon[]): Pokemon {
  const randomNum = Math.floor(Math.random() * 4);
  return listOfPokemon[randomNum];
}

export function checkIfCorrectGuess(guess: string, answer: string) {
  return guess === answer;
}

export function messageGuess(hasGuessed: boolean, pokemonName: string) {
  return hasGuessed
    ? 'Congrats. Your guess was correct!'
    : `Sorry, wrong guess. The answer is: ${capitalizeFirstLetter(
        pokemonName
      )}`;
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
