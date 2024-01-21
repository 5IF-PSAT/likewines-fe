import comparisonService from "../../services/comparison";
import { useEffect, useState } from "react";
import { ComparedWine } from "../../interfaces";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

function formatNumber(num: number) {
  // Round to 4 decimal places
  return Math.round(num * 10000) / 10000;
}

export default function ComparisonRes(props: {
  wineId: number;
  vintage: number;
}) {
  const [comparison, setComparison] = useState<ComparedWine[]>();
  useEffect(() => {
    comparisonService
      .getWineComparison(props.wineId, props.vintage)
      .then((data) => {
        setComparison(data);
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
                    height: 150,
                    maxWidth: 1500,
                    maxHeight: 150,
                  }}
                  key={wine.id}
                >
                  <Container>
                    <Typography
                      variant="subtitle2"
                      sx={{ textAlign: "center" }}
                    >
                      *** Most similar wine ***
                    </Typography>

                    <Typography variant="h6" sx={{ textAlign: "center" }}>
                      {wine.wine_name} - {wine.vintage}
                    </Typography>
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
                    <Typography variant="h6">
                      {wine.wine_name} - {wine.vintage}
                    </Typography>
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
      </div>
    </>
  );
}
