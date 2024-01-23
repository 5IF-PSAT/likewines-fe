import { useParams } from "react-router-dom";
import ComparisonInfo from "../components/Comparison/ComparisonInfo";
import Title from "../components/Title";
import WineInfo from "../components/WineInfo";
import { Typography } from "@mui/material";
function Comparison() {
  const id = Number(useParams().id);

  return (
    <>
      <Title text="Wine Similarity" />
      <Typography variant="h5" className="centered" sx={{ marginBottom: 2 }}>
        Need a replacement for your favorite wine?
      </Typography>
      <WineInfo id={id} />
      <ComparisonInfo id={id} />
    </>
  );
}

export default Comparison;
