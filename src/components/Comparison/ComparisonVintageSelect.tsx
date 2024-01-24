import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import vintageService from "../../services/vintage";
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
export default function ComparisonVintageSelect(props: {
  id: number;
  vintageHandler: (vintage: string) => void;
}) {
  const [vintages, setVintages] = useState([]);
  useEffect(() => {
    vintageService.getVintages(props.id).then((data) => {
      setVintages(data);
    });
  }, [props.id]);
  const [vintageChoice, setVintageChoice] = useState("");

  const hanldleVintageChange = (event: SelectChangeEvent) => {
    setVintageChoice(event.target.value);
    props.vintageHandler(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Vintage</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={vintageChoice}
          onChange={hanldleVintageChange}
          autoWidth
          label="Vintage"
          MenuProps={MenuProps}
        >
          {vintages.map((vintage) => (
            <MenuItem value={vintage}>{vintage}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
