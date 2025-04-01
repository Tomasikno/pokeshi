import { NextRequest, NextResponse } from 'next/server';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

// Ensure the API key is set server-side
const API_KEY = process.env.POKEMONTCG_API_KEY;

if (!API_KEY) {
  throw new Error('POKEMONTCG_API_KEY is not set in the environment variables.');
}

export async function GET(
  request: NextRequest,
  { params }: { params: { query: string } }
) {
  const { query } = await params;

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
    console.log(cardId);
    const card = await PokemonTCG.findCardByID(cardId);
    if (!card) {
      throw new Error(`No card found for ID: ${cardId}`);
    }

    return NextResponse.json({ data: card });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}