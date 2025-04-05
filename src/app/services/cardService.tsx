import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

interface ApiResponse {
  data: PokemonTCG.Card;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
const cardCache = new Map<string, PokemonTCG.Card>();

export async function fetchCard(ptcgoCode: string, pokemonNumber: string): Promise<PokemonTCG.Card> {
  if (!ptcgoCode || !pokemonNumber) {
    throw new Error('Invalid format. Use "SET NUMBER" (e.g., "PRE 011")');
  }

  const apiQuery = `${ptcgoCode}-${pokemonNumber}`;
  if (cardCache.has(apiQuery)) {
    return cardCache.get(apiQuery)!;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/search/${apiQuery}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const result: ApiResponse = await response.json();
    if (!result.data) {
      throw new Error('No card data returned from API');
    }

    cardCache.set(apiQuery, result.data);
    return result.data;
  } catch (error) {
    throw new Error(`Failed to fetch card ${apiQuery}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}