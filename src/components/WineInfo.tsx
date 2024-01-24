import wineService from "../services/wine";
import { DetailedWine } from "../interfaces";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import { tableCellClasses } from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import WineStatsCell from "./WineStatsCell";
import { CircularProgress, Link } from "@mui/material";
import { useEffect, useState } from "react";
export interface props {
  id: number;
}

export default function WineInfo({ id }: props) {
  const [wine, setWine] = useState<DetailedWine>();
  useEffect(() => {
    wineService.getWineById(id).then((data) => {
      setWine(data);
    });
  }, [id]);

  const flagUrl = `https://flagcdn.com/w20/${wine?.country_code.toLowerCase()}.png`;

  // Show the all the wine's info
  const card = (
    <>
      {wine === undefined && <CircularProgress />}
      {wine !== undefined && (
        <>
          <div className="centered">
            <Typography variant="h4" fontWeight="bold">
              {wine.wine_name}
            </Typography>
            {wine.winery_website && (
              <Link underline="hover" href={wine.winery_website}>
                <Typography variant="h5" display="inline">
                  {wine.winery}
                </Typography>
              </Link>
            )}
            {wine.winery_website === "" && (
              <Typography variant="h5" display="inline">
                {wine.winery}
              </Typography>
            )}
            <Typography variant="h5" display="inline">
              &nbsp; | &nbsp;
            </Typography>
            <img src={flagUrl} alt={wine.country_code} />
            <Typography variant="h5" display="inline">
              &nbsp;
              {wine.region}, {wine.region_country}
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
      )}
    </>
  );

  return <Card sx={{ minWidth: 275 }}>{card}</Card>;
}
