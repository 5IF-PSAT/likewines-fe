import { useState } from "react";
import { Container, Grid } from "@mui/material";
import ComparisonRes from "./ComparisonRes";
import ComparisonVintageSelect from "./ComparisonVintageSelect";
export interface props {
  id: number;
}

export default function ComparisonInfo({ id }: props) {
  const [vintage, setVintage] = useState("");
  const [showComparison, setShowComparison] = useState(false);

  const vintageHandler = (vintage: string) => {
    // If the input is not a number, don't do anything
    if (isNaN(Number(vintage))) {
      setVintage("");
    } else {
      setVintage(vintage);
      setShowComparison(true);
    }
  };

  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h4 className="centered">What vintage is your wine bottle?</h4>
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <ComparisonVintageSelect
                id={id}
                vintageHandler={vintageHandler}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
      {showComparison && (
        <ComparisonRes wineId={id} vintage={Number(vintage)} />
      )}
    </>
  );
}
