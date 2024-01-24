/* eslint-disable @typescript-eslint/no-explicit-any */
import predictionService from "../../services/prediction";
import { useEffect, useState } from "react";
import { Ratings } from "../../interfaces";
import {
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryLine,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
  VictoryLegend,
} from "victory";
import { CircularProgress, Container } from "@mui/material";

function formatNumber(num: number) {
  // Round to 2 decimal places
  return Math.round(num * 100) / 100;
}

function getMinMax(
  predictionData: any[] | undefined,
  actualData: any[] | undefined
) {
  if (predictionData === undefined || actualData === undefined) {
    return [0, 5];
  }
  // Get the min and max of all ratings in order to set the domain of the graph
  let min = 5;
  let max = 0;

  predictionData.forEach((rating: { y: number }) => {
    if (rating.y < min) {
      min = rating.y;
    }
    if (rating.y > max) {
      max = rating.y;
    }
  });

  actualData.forEach((rating: { y: number }) => {
    if (rating.y < min) {
      min = rating.y;
    }
    if (rating.y > max) {
      max = rating.y;
    }
  });
  // Floor the min and ceil the max
  min = Math.floor(min);
  max = Math.ceil(max);
  return [min, max];
}

export default function PredictionRes(props: {
  wineId: number;
  ratingYear: number;
}) {
  const [prediction, setPrediction] = useState<Ratings[]>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    predictionService
      .getWinePrediction(props.wineId, props.ratingYear)
      .then((data) => {
        setPrediction(data);
        setIsLoading(false);
      });
  }, [props.ratingYear, props.wineId]);
  const predictionData = prediction?.map((rating) => {
    return { x: rating.batch_vintage, y: formatNumber(rating.predict_rating) };
  });
  const actualData = prediction?.map((rating) => {
    return { x: rating.batch_vintage, y: formatNumber(rating.actual_rating) };
  });
  const domain = getMinMax(predictionData, actualData);

  const padding = { top: 50, bottom: 50, left: 70, right: 50 };
  const chartTheme = VictoryTheme.material;
  // This block of ifs is to handle the "possibly undefined" error.
  if (chartTheme.axis) {
    if (chartTheme.axis.style) {
      if (chartTheme.axis.style.axisLabel) {
        chartTheme.axis.style.axisLabel.fill = "#666";
      }
      if (chartTheme.axis.style.tickLabels) {
        chartTheme.axis.style.tickLabels.fill = "#666";
      }
    }
  }
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
        {!isLoading && prediction?.length !== 0 && (
          <Container sx={{ height: 500 }}>
            <VictoryChart
              domainPadding={{ y: 10 }}
              theme={chartTheme}
              padding={padding}
              width={1000}
              height={400}
              containerComponent={
                <VictoryVoronoiContainer
                  voronoiDimension="x"
                  labels={({ datum }) => `${datum.y}★`}
                  labelComponent={
                    <VictoryTooltip
                      cornerRadius={5}
                      flyoutStyle={{
                        fill: "#999",
                      }}
                    />
                  }
                />
              }
            >
              <VictoryLegend
                x={700}
                y={0}
                orientation="horizontal"
                gutter={20}
                style={{ border: { stroke: "white" } }}
                data={[
                  {
                    name: "Predicted Rating",
                    symbol: { fill: "#efe1a1" },
                    labels: { fill: "#efe1a1" },
                  },
                  {
                    name: "Actual Rating",
                    symbol: { fill: "#ff66aa" },
                    labels: { fill: "#ff66aa" },
                  },
                ]}
              />
              {/* The tickFormat is used to format the year from the default "2,024" to "2024"*/}
              <VictoryAxis
                label="Batch"
                style={{
                  axisLabel: { padding: 50, fontSize: 20 },
                  tickLabels: { fontSize: 20 },
                }}
                tickFormat={(t) => `${t}`}
              />
              <VictoryAxis
                dependentAxis
                label="Rating"
                style={{
                  axisLabel: { padding: 50, fontSize: 20 },
                  tickLabels: { fontSize: 20 },
                }}
                domain={[domain[0], domain[1]]}
              />
              <VictoryLine
                width={10}
                height={10}
                style={{
                  data: { stroke: "#efe1a1" },
                  labels: { fill: "#efe1a1", fontSize: 20 },
                }}
                labelComponent={<VictoryLabel renderInPortal dy={-20} />}
                data={predictionData}
                animate={{
                  duration: 3000,
                  onLoad: { duration: 2000 },
                }}
              />
              <VictoryLine
                width={10}
                height={10}
                style={{
                  data: { stroke: "#ff66aa" },
                  labels: { fill: "#ff66aa", fontSize: 20 },
                }}
                labelComponent={<VictoryLabel renderInPortal dy={-20} />}
                data={actualData}
                animate={{
                  duration: 3000,
                  onLoad: { duration: 2000 },
                }}
              />
            </VictoryChart>
          </Container>
        )}
      </div>
    </>
  );
}
