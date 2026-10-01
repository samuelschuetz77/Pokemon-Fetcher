import type { PokemonData } from './Pokemon';

export default function PokemonCard({ pokemon }: { pokemon: PokemonData }) {
  return (
    <section>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.imageUrl} alt={pokemon.name} />
      <p>Base experience: {pokemon.baseExperience}</p>
      <p>Attack: {pokemon.attack}</p>
      <p>Defense: {pokemon.defense}</p>
      <p>Base HP: {pokemon.hp}</p>
    </section>
  );
}
