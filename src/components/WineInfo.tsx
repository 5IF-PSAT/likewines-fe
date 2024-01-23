import wineService from "../services/wine";
import { Wine } from "../interfaces";
import { useQuery } from "react-query";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import { tableCellClasses } from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import WineStatsCell from "./WineStatsCell";
import { CircularProgress } from "@mui/material";
export interface props {
  id: number;
}

export default function WineInfo({ id }: props) {
  const { isLoading, isError, data } = useQuery(["id", id], () =>
    wineService.getWineById(id)
  );
  if (isLoading) {
    return (
      <div className="centered">
        <CircularProgress />
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
  // Show the all the wine's info
  const card = (
    <>
      <div className="centered">
        <Typography variant="h4" fontWeight="bold">
          {wine.wine_name}
        </Typography>
        <Typography variant="h5" display="inline">
          {wine.winery}{" "}
        </Typography>
        <Typography variant="h5" display="inline">
          | {wine.region}
        </Typography>
      </div>
      <Typography variant="body1">
        <Table
          sx={{
            minWidth: 250,
            [`& .${tableCellClasses.root}`]: { borderBottom: "none" },
          }}
          size="small"
        >
          <TableBody>
            <WineStatsCell name="Type" value={wine.type} />
            <WineStatsCell name="Elaborate" value={wine.elaborate} />
            <WineStatsCell name="Alcohol" value={wine.abv} />
            <WineStatsCell name="Body" value={wine.body} />
            <WineStatsCell name="Acidity" value={wine.acidity} />
          </TableBody>
        </Table>
      </Typography>
    </>
  );

  return <Card sx={{ minWidth: 275 }}>{card}</Card>;
}
