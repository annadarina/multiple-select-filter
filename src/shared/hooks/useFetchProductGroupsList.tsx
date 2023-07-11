import { useState, useEffect } from "react";
import { fetchProductGroups } from "../../services";

interface FetchProductGroupsListResult {
  productGroups: string[];
  isLoading: boolean;
  error: string | null;
}

export const useFetchProductGroupsList = (): FetchProductGroupsListResult => {
  const [productGroups, setProductGroups] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /** Fetching product groups */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProductGroups();
        setIsLoading(false);
        // sort options alphabetically and replace '&amp;' with '&'
        const sortedGroups = [...data]
          .sort((a, b) => a.localeCompare(b))
          .map((group) => group.replace("&amp;", "&"));
        setProductGroups(sortedGroups);
      } catch (error: any) {
        // Handle the error
        console.error("Error occurred while fetching product groups:", error);
        setError(error?.message as string);
      }
    };

    fetchData();
  }, []);

  return { productGroups, isLoading, error };
};
