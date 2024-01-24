import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
// Copied from https://mui.com/components/selects/#select-with-auto-width

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export default function PredictionRatingYearSelect(props: {
  id: number;
  ratingYearHandler: (rating_year: string) => void;
}) {
  const ratingYears = Array.from({ length: 23 }, (_, index) => 2023 + index);
  const [yearChoice, setYearChoice] = useState("2023");

  const hanldleYearChange = (event: SelectChangeEvent) => {
    setYearChoice(event.target.value);
    props.ratingYearHandler(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Vintage</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={yearChoice}
          onChange={hanldleYearChange}
          autoWidth
          label="Year"
          MenuProps={MenuProps}
        >
          {ratingYears.map((year) => (
            <MenuItem value={year}>{year}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
