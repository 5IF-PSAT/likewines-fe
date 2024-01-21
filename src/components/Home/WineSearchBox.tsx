import TextField from "@mui/material/TextField";
import { useState, useRef } from "react";
import searchService from "../../services/wine";
import List from "@mui/material/List";
import WineResItem from "./WineResItem";
import Container from "@mui/material/Container";
import { Wine } from "../../interfaces";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import ListItem from "@mui/material/ListItem";
import Grow from "@mui/material/Grow";
import Fade from "@mui/material/Fade";
import { useTheme } from "@mui/material/styles";

export default function WineSearchBox(props: { isCompare: boolean }) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [wines, setWines] = useState<readonly Wine[]>([]);
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const throttling = useRef(false);

  const handleThrottleSearch = () => {
    if (throttling.current) {
      return;
    }

    if (!inputRef.current.value.trim()) {
      setWines([]);
      return;
    }

    throttling.current = true;
    setLoading(true);
    setTimeout(() => {
      throttling.current = false;
      searchService
        .getWine(inputRef.current.value)
        .then((data) => {
          setWines(data);
        })
        .then(() => {
          setLoading(false);
        });
    }, 1000);
  };
  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
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
                  width: 400,
                }}
                id="search-box"
                inputRef={inputRef}
                hiddenLabel
                onChange={handleThrottleSearch}
                color="secondary"
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            {loading && (
              <Grow in={loading} timeout={500}>
                <h3 className="centered">Looking for your favorite wine...</h3>
              </Grow>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              {loading ? (
                <List
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 1200,
                    gap: "12px 12px",
                    minHeight: 300,
                    flexFlow: "row wrap",
                    overflow: "auto",
                  }}
                >
                  {Array.from(new Array(8)).map((_, index) => (
                    <Fade in={loading} timeout={500} key={index}>
                      <ListItem
                        disablePadding
                        disableGutters
                        sx={{
                          maxWidth: 500,
                          maxHeight: 100,
                        }}
                        key={index}
                      >
                        <Skeleton
                          variant="rounded"
                          width={500}
                          height={100}
                          sx={{ bgcolor: theme.palette.secondary.main }}
                        />
                      </ListItem>
                    </Fade>
                  ))}
                </List>
              ) : (
                <Fade in={!loading} timeout={500}>
                  <List
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 1200,
                      gap: "12px 12px",
                      minHeight: 300,
                      flexFlow: "row wrap",
                      overflow: "auto",
                    }}
                  >
                    {wines.map((wine: Wine) => (
                      <WineResItem
                        isCompare={props.isCompare}
                        wine={wine}
                        key={wine.id}
                      />
                    ))}
                  </List>
                </Fade>
              )}
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
