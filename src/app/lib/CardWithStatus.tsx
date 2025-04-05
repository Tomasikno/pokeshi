import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

export interface CardWithStatus extends PokemonTCG.Card {
    acquired: boolean;
  }