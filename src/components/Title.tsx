import Grid from "@mui/material/Grid";

export interface TitleProps {
  text: string;
}

export default function Title({ text }: TitleProps) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          {/* <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              className="button"
              sx={{ mt: 2, ml: 2 }}
              color="primary"
              variant="contained"
              startIcon={<ArrowBackIcon />}
            >
              Back
            </Button>
          </Link> */}
        </Grid>
        <Grid item xs={10}>
          <h1>{text}</h1>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </>
  );
}
