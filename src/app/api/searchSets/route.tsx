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

  try {
    const query: PokemonTCG.Parameter = { q: `` };
    const sets = await PokemonTCG.findSetsByQueries(query);

    if (!sets) {
      throw new Error(`No card sets found`);
    }

    const setsMap = sets.map((set) => ({
      code: set.ptcgoCode,
      name: set.name
    }));

    return NextResponse.json({ data: setsMap });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}