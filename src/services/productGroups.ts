/**
 * Fetch product groups list
 */
export const fetchProductGroups = async (): Promise<string[]> => {
  const response = await fetch("/api/items.json");
  if (!response.ok) {
    throw new Error("Error occurred");
  }
  const data = await response.json();
  return data.data;
};
