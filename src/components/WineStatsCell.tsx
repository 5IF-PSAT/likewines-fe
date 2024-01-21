import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";

interface props {
  name: string;
  value: string | number;
}

export default function WineStatsCell({ name, value }: props) {
  return (
    <TableRow key={name}>
      <TableCell component="th" scope="row">
        <Typography variant="body1" color="">
          {name}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Typography variant="body1" color="">
          {value}
        </Typography>
      </TableCell>
    </TableRow>
  );
}
