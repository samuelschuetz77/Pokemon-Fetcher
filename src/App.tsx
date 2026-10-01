import { useCallback, useEffect, useState } from 'react';
import type { PokemonData } from './Pokemon';
import PokemonCard from './PokemonCard';
import { fetchRandomPokemon } from './randomPokemonFetcher';

export default function App() {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [currentPokemonHealth, setHealth] = useState(100);
  const [error, setError] = useState<string | null>(null);

  const cycleNewPokemon = useCallback(async () => {
    const newPokemon = await fetchRandomPokemon();
    setPokemon(newPokemon);
    setHealth(100);
    setError(null);
  }, []);

  function showLoadError() {
    setError('Could not load a Pokemon. Please try again.');
  }

  useEffect(() => {
    // State updates happen after the awaited API request, not synchronously.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void cycleNewPokemon().catch(showLoadError);
  }, [cycleNewPokemon]);

  useEffect(() => {
    if (currentPokemonHealth <= 0) {
      // This assignment uses an effect to fetch a replacement at zero health.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      void cycleNewPokemon().catch(showLoadError);
    }
  }, [currentPokemonHealth, cycleNewPokemon]);

  function attackPokemon() {
    setHealth(previousHealth => Math.max(0, previousHealth - 25));
  }

  const loading = pokemon === null || currentPokemonHealth <= 0;

  return (
    <main>
      <h1>Pokemon Fetcher</h1>
      {error ? (
        <div role="alert">
          <p>{error}</p>
          <button onClick={() => void cycleNewPokemon().catch(showLoadError)}>Try Again</button>
        </div>
      ) : loading ? (
        <p role="status">Loading Pokemon...</p>
      ) : null}
      {pokemon && <PokemonCard pokemon={pokemon} />}
      <p>Remaining health: {currentPokemonHealth}</p>
      <button onClick={attackPokemon} disabled={loading}>
        Attack Pokémon
      </button>
    </main>
  );
}
