import comparisonService from "../../services/comparison";
import { useEffect, useState } from "react";
import { ComparedWine } from "../../interfaces";
import {
  CircularProgress,
  Container,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import Link from "@mui/material/Link";

function formatNumber(num: number) {
  // Round to 4 decimal places
  return Math.round(num * 10000) / 10000;
}

export default function ComparisonRes(props: {
  wineId: number;
  vintage: number;
}) {
  const [comparison, setComparison] = useState<ComparedWine[]>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    comparisonService
      .getWineComparison(props.wineId, props.vintage)
      .then((data) => {
        setComparison(data);
        setIsLoading(false);
      });
  }, [props.vintage, props.wineId]);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading && <CircularProgress />}
        {!isLoading && comparison?.length !== 0 && (
          <List
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 1500,
              gap: "12px 12px",
              minHeight: 300,
              flexFlow: "row wrap",
              overflow: "auto",
            }}
          >
            {comparison?.map((wine, index) => (
              <>
                {index === 0 && (
                  <ListItem
                    sx={{
                      width: 1200,
                      height: 250,
                      maxWidth: 1500,
                      maxHeight: 250,
                    }}
                    key={wine.id}
                  >
                    <Container>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                        }}
                      >
                        *** Most similar wine ***
                      </Typography>
                      <Link underline="hover" href={`/comparison/${wine.id}`}>
                        <Typography variant="h6" sx={{ textAlign: "center" }}>
                          {wine.wine_name} - {wine.vintage}
                        </Typography>
                      </Link>
                      <Typography
                        variant="subtitle2"
                        sx={{ textAlign: "center" }}
                      >
                        {wine.type} - Alc. {wine.abv}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{ textAlign: "center" }}
                      >
                        {wine.winery} - {wine.region}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{ textAlign: "center" }}
                      >
                        Euclidean Distance: {formatNumber(wine.distance)}
                      </Typography>

                      <Typography
                        variant="subtitle2"
                        sx={{
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                          marginTop: "5rem",
                        }}
                      >
                        * Other wines that may peek your interest *
                      </Typography>
                    </Container>
                  </ListItem>
                )}
                {index !== 0 && (
                  <ListItem
                    sx={{
                      width: 400,
                      height: 150,
                      maxWidth: 500,
                      maxHeight: 150,
                    }}
                    key={wine.id}
                  >
                    <Container>
                      <Link underline="hover" href={`/comparison/${wine.id}`}>
                        <Typography variant="h6">
                          {wine.wine_name} - {wine.vintage}
                        </Typography>
                      </Link>
                      <Typography variant="subtitle2">
                        {wine.type} - Alc. {wine.abv}
                      </Typography>
                      <Typography variant="subtitle2">
                        {wine.winery} - {wine.region}
                      </Typography>
                      <Typography variant="caption">
                        Euclidean Distance: {formatNumber(wine.distance)}
                      </Typography>
                    </Container>
                  </ListItem>
                )}
              </>
            ))}
          </List>
        )}
      </div>
    </>
  );
}
