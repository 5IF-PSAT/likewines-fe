import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Wine } from "../../interfaces";
import { useTheme } from "@mui/material/styles";

export default function WineResItem(props: { isCompare: boolean; wine: Wine }) {
  const theme = useTheme();
  let bgcolor = "#9b0000";
  if (props.wine.type === "Red") {
    bgcolor = theme.palette.red_wine;
  } else if (props.wine.type === "White") {
    bgcolor = theme.palette.white_wine;
  } else if (props.wine.type === "Rosé") {
    bgcolor = theme.palette.rose_wine;
  } else if (props.wine.type === "Sparkling") {
    bgcolor = theme.palette.sparkling_wine;
  } else if (props.wine.type === "Dessert") {
    bgcolor = theme.palette.red_wine;
  }
  return (
    <ListItemButton
      LinkComponent={"a"}
      href={
        props.isCompare
          ? `/comparison/${props.wine.id}`
          : `/prediction/${props.wine.id}`
      }
      sx={{
        width: 500,
        height: 100,
        maxWidth: 500,
        maxHeight: 100,
        bgcolor: theme.palette.wine_search,
        ":hover": {
          bgcolor: bgcolor,
        },
      }}
    >
      <ListItemText
        sx={{ textAlign: "center" }}
        primary={props.wine.wine_name}
        secondary={`${props.wine.type} - Alc. ${props.wine.abv}%`}
      />
    </ListItemButton>
  );
}
