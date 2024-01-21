import wineService from "../../services/wine";
import { Wine, Winery, Region } from "../../interfaces";
import { useQuery } from "react-query";
import { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import CalculateRoundedIcon from "@mui/icons-material/CalculateRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import ComparisonRes from "./ComparisonRes";
export interface props {
  id: number;
}

export default function ComparisonInfo({ id }: props) {
  const [vintage, setVintage] = useState(0);
  const [showComparison, setShowComparison] = useState(false);
  const { isLoading, isError, data } = useQuery(["id", id], () =>
    wineService.getWineById(id)
  );
  if (isLoading) {
    return (
      <div>
        <h2 className="centered">Loading...</h2>
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <h2 className="centered">Error :/</h2>
      </div>
    );
  }

  const handleChange = (vintage: string) => {
    // If the input is not a number, don't do anything
    if (isNaN(Number(vintage))) {
      setVintage(0);
    }
    setVintage(Number(vintage));
  };

  const handleShowComparison = () => {
    setShowComparison(true);
  };

  const wine = data as Wine;

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
              <TextField
                autoComplete="off"
                inputProps={{ style: { textAlign: "center" } }}
                sx={{
                  width: 200,
                }}
                id="search-box"
                hiddenLabel
                onChange={(e) => handleChange(e.target.value)}
                color="secondary"
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="centered">
              <Button
                variant="outlined"
                size="large"
                onClick={() => {
                  handleShowComparison();
                }}
                color="primary"
              >
                Compare
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
      {showComparison && <ComparisonRes wineId={wine.id} vintage={vintage} />}
    </>
  );
}
