import type { PokemonData } from './Pokemon';

export async function fetchRandomPokemon() {
  const randomId = Math.floor(Math.random() * 1000) + 1;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
  const allData = await response.json();

  const pokemon: PokemonData = {
    name: allData.name,
    imageUrl: allData.sprites.front_default,
    baseExperience: allData.base_experience,
    attack: allData.stats.find(
      (entry: { stat: { name: string } }) => entry.stat.name === 'attack',
    ).base_stat,
    defense: allData.stats.find(
      (entry: { stat: { name: string } }) => entry.stat.name === 'defense',
    ).base_stat,
    hp: allData.stats.find(
      (entry: { stat: { name: string } }) => entry.stat.name === 'hp',
    ).base_stat,
  };

  return pokemon;
}
