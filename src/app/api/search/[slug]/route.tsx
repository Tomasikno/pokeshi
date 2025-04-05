import { NextRequest, NextResponse } from 'next/server';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

const API_KEY = process.env.POKEMONTCG_API_KEY;

if (!API_KEY) {
  throw new Error('POKEMONTCG_API_KEY is not set in the environment variables.');
}

const cardCache = new Map<string, PokemonTCG.Card>();

function log(message: string, level: 'info' | 'error' = 'info') {
  console[level](`[${new Date().toISOString()}] ${message}`);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  log(`Fetching card for slug: ${slug}`);

  if (cardCache.has(slug)) {
    log(`Cache hit for slug: ${slug}`);
    return NextResponse.json({ data: cardCache.get(slug) }, { status: 200 });
  }

  try {
    const [ptcgoCode, pokemonNumber] = slug.split('-');
    if (!ptcgoCode || !pokemonNumber) {
      return NextResponse.json(
        { error: 'Invalid query format. Use "SET-NUMBER" (e.g., "PRE-011")' },
        { status: 400 }
      );
    }

    const parsedNumber = parseInt(pokemonNumber, 10);
    if (isNaN(parsedNumber) || parsedNumber <= 0) {
      return NextResponse.json(
        { error: 'Pokemon number must be a positive integer' },
        { status: 400 }
      );
    }

    const setParams: PokemonTCG.Parameter = { q: `ptcgoCode:${ptcgoCode}` };
    const sets = await PokemonTCG.findSetsByQueries(setParams);
    if (!sets.length) {
      return NextResponse.json(
        { error: `No set found for PTCGO code: ${ptcgoCode}` },
        { status: 404 }
      );
    }

    const cardId = `${sets[0].id}-${parsedNumber}`;
    const card = await PokemonTCG.findCardByID(cardId);

    cardCache.set(slug, card);
    log(`Successfully fetched card for slug: ${slug}`);
    return NextResponse.json({ data: card }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';

    log(`Error fetching card for slug: ${slug} - ${errorMessage}`, 'error');

    return NextResponse.json({ error: errorMessage }, { status: 404 });
  }
}