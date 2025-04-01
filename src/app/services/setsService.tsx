export async function fetchSets() {
    const response = await fetch(`/api/searchSets/}`);
    const result = await response.json();
  
    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch card');
    }
  
    return result.data;
  }
  