import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  FormGroup,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { ReactComponent as Search } from "../svg/search.svg";
import { ListItem } from "./ListItem";
import { Placeholder } from "./Placholder";
import { LoadingPlaceholder } from "./LoadingPlaceholder";

interface Props {
  title: string;
  listItems: string[];
  onApply: () => void;
  onSelect: (value: string[]) => void;
  selectedItems: string[];
  listHeight?: number | string;
  isLoading?: boolean;
  error?: string | null;
  storageKey?: string;
  buttonLabel?: string;
  placeholder?: string;
  classes?: any;
  className?: any;
}

export const MultipleSelectFilter = (props: Props) => {
  const {
    title,
    listItems,
    selectedItems,
    onSelect,
    onApply,
    listHeight = 300,
    error = null,
    isLoading = false,
    buttonLabel = "Toepassen",
    placeholder = "Zoek op...",
    storageKey,
    classes,
    className = "",
  } = props;
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedOptions, setSelectedOption] = useState<string[]>([]);

  const { classes: classesList } = useStyles(undefined, {
    props: { classes },
  });

  /** Get selected items from the localStorage if a key provided */
  useEffect(() => {
    if (storageKey) {
      const savedOptions = localStorage.getItem(storageKey);
      if (savedOptions) {
        setSelectedOption(JSON.parse(savedOptions));
      }
    } else {
      setSelectedOption(selectedItems);
    }
  }, [selectedItems, storageKey]);

  /** Show filtered items that are not in the selected list */
  const filteredListItems = useMemo(() => {
    return listItems.filter((listItem: string) => {
      return (
        !selectedOptions.includes(listItem) &&
        listItem.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
      );
    });
  }, [listItems, searchInput, selectedOptions]);

  /** Handle text input */
  const handleChangeSearchInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchInput(value);
    },
    [],
  );

  /** Handle options selection */
  const handleOnChange = useCallback(
    (selectedOption: any) => {
      if (!selectedOption) {
        return;
      }

      const exists = selectedOptions.includes(selectedOption);

      if (exists) {
        const updated = selectedOptions.filter(
          (item: string) => item !== selectedOption,
        );
        setSelectedOption(updated);
        onSelect(updated);
        if (storageKey) {
          localStorage.setItem(storageKey, JSON.stringify(updated));
        }
        return;
      }

      const updated = [...selectedOptions, selectedOption];
      setSelectedOption((state: string[]) => [...state, selectedOption]);
      if (storageKey) {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      }
      onSelect(updated);
    },
    [storageKey, onSelect, selectedOptions],
  );

  const optionsList = (
    <FormGroup>
      {Boolean(selectedOptions.length) &&
        selectedOptions.map((value: string) => (
          <ListItem
            key={value}
            option={value}
            onChange={handleOnChange}
            isSelected={selectedOptions.includes(value)}
          />
        ))}
      {Boolean(filteredListItems.length) || Boolean(selectedItems.length) ? (
        <>
          {filteredListItems.map((value: string) => (
            <ListItem
              key={value}
              option={value}
              onChange={handleOnChange}
              isSelected={selectedOptions.includes(value)}
            />
          ))}
        </>
      ) : (
        <Placeholder message="No options found" status="info" />
      )}
    </FormGroup>
  );

  return (
    <Grid
      item
      xs={12}
      sm={4}
      classes={{ root: classesList.wrapper }}
      className={className}
    >
      <Typography pb={2}>{title}</Typography>
      <TextField
        sx={{ mb: 2 }}
        id="textFilter"
        aria-label="Search Filter"
        placeholder={placeholder}
        value={searchInput}
        classes={{ root: classesList.textField }}
        onChange={handleChangeSearchInput}
        InputProps={{
          endAdornment: <Search className={classesList.searchIcon} />,
        }}
      />
      <FormControl
        component="fieldset"
        classes={{ root: classesList.list }}
        sx={{ maxHeight: listHeight, minHeight: listHeight }}
      >
        {isLoading && <LoadingPlaceholder />}

        {Boolean(error) && (
          <Placeholder message={error as string} status="error" />
        )}

        {!isLoading && !Boolean(error) && optionsList}
      </FormControl>
      <Button sx={{ mt: 2 }} onClick={onApply}>
        {buttonLabel}
      </Button>
    </Grid>
  );
};

const useStyles = makeStyles<any>()(({ palette }, classes) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    padding: 24,
    borderRadius: "5px",
    border: "2px solid #D0CFCD",
    backgroundColor: "#F8F8F8",
    ...classes?.wrapper,
  },
  textField: {
    backgroundColor: palette.common.white,
    ...classes?.textField,
  },
  searchIcon: {
    width: "24px",
    height: "24px",
    fill: palette.text.secondary,
    ...classes?.searchIcon,
  },
  list: {
    overflowY: "scroll",
    height: "100%",
    ...classes?.list,
  },
}));
