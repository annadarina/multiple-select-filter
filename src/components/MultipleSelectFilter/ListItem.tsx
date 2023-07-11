import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { ReactComponent as CheckedIcon } from "./assets/svg/checkedIcon.svg";

interface Props {
  option: string;
  onChange: (value: string) => void;
  isSelected: boolean;
}

export const ListItem = ({ option, onChange, isSelected }: Props) => {
  return (
    <FormControlLabel
      componentsProps={{
        typography: {
          color: isSelected ? "primary" : "default",
        },
      }}
      control={
        <Checkbox
          checked={isSelected}
          name={option}
          onChange={() => onChange(option)}
          tabIndex={0}
          checkedIcon={<CheckedIcon className="MuiSvgIcon-root" />}
        />
      }
      label={option}
      sx={{ ml: 0 }}
    />
  );
};
