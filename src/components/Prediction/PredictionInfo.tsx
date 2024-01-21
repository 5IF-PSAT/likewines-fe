import wineService from "../../services/wine";
import { Wine } from "../../interfaces";
import { useQuery } from "react-query";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Title from "../Title";
import Table from "@mui/material/Table";
import { tableCellClasses } from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import WineStatsCell from "../WineStatsCell";
export interface props {
  id: number;
}

export default function PredictionInfo({ id }: props) {
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

  const wine = data as Wine;
  //const winery: Winery = wineryService.getWinery(wine.winery_id).then((data) => data);
  //const region = regionService.getRegion(wine.region_id).then((data) => data);

  return (
    <>
      <h3 className="centered">{wine.wine_name}</h3>
    </>
  );
}
