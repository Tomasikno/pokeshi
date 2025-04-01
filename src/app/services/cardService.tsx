// services/cardService.ts
export async function fetchCard(ptcgoCode: string, pokemonNumber: string) {
    if (!ptcgoCode || !pokemonNumber) {
      throw new Error('Invalid format. Use "SET NUMBER" (e.g., "PRE 011")');
    }
  
    const apiQuery = `${ptcgoCode}-${pokemonNumber}`;
    const response = await fetch(`/api/search/${apiQuery}`);
    const result = await response.json();
  
    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch card');
    }
  
    return result.data;
  }
  