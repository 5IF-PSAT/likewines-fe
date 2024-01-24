import { useState } from "react";
import { Container, Grid } from "@mui/material";
import PredictionRatingYearSelect from "./PredictionRatingYearSelect";
import PredictionRes from "./PredictionRes";
export interface props {
  id: number;
}

export default function ComparisonInfo({ id }: props) {
  const [ratingYear, setRatingYear] = useState<number>(2023);

  const ratingYearHandler = (vintage: string) => {
    setRatingYear(Number(vintage));
  };

  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h4 className="centered">
              What year do you want to keep your bottle to?
            </h4>
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
              <PredictionRatingYearSelect
                id={id}
                ratingYearHandler={ratingYearHandler}
              />
            </div>
          </Grid>
        </Grid>
      </Container>

      <PredictionRes wineId={id} ratingYear={Number(ratingYear)} />
    </>
  );
}
