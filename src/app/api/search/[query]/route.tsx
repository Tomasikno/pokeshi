import { NextRequest, NextResponse } from 'next/server';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

// Ensure the API key is set server-side
const API_KEY = process.env.POKEMONTCG_API_KEY;

if (!API_KEY) {
  throw new Error('POKEMONTCG_API_KEY is not set in the environment variables.');
}

export async function GET(
  request: NextRequest,
) {

  const url = new URL(request.url).href;
  const query = url.substring(url.lastIndexOf('/') + 1)
  try {
    const [ptcgoCode, pokemonNumber] = query.split('-');
    if (!ptcgoCode || !pokemonNumber) {
      throw new Error('Invalid query format. Use "SET-NUMBER" (e.g., "PRE-011")');
    }

    const setParams: PokemonTCG.Parameter = { q: `ptcgoCode:${ptcgoCode}` };
    const sets = await PokemonTCG.findSetsByQueries(setParams);
    if (!sets.length) {
      throw new Error(`No set found for PTCGO code: ${ptcgoCode}`);
    }

    const cardId = `${sets[0].id}-${ parseInt(pokemonNumber)}`;
    const card = await PokemonTCG.findCardByID(cardId);
    if (!card) {
      throw new Error(`No card found for ID: ${cardId}`);
    }

    return NextResponse.json({ data: card });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}