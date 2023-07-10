import React, { useState } from "react";
import { Grid } from "@mui/material";
import { MultipleSelectFilter } from "../../components/MultipleSelectFilter";
import { useFetchProductGroupsList } from "../../shared/hooks";

const PRODUCT_GROUPS_KEY = "productGroups";

export const Demo = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { productGroups, isLoading, error } = useFetchProductGroupsList();

  const handleSelect = (options: string[]) => {
    setSelectedItems(options);
  };

  const handleApply = () => {
    console.log("Selected items: ", selectedItems);
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100vh" }}
    >
      <MultipleSelectFilter
        title="Productgroep"
        listItems={productGroups}
        selectedItems={selectedItems}
        onSelect={handleSelect}
        onApply={handleApply}
        error={error}
        isLoading={isLoading}
        storageKey={PRODUCT_GROUPS_KEY}
      />
    </Grid>
  );
};
