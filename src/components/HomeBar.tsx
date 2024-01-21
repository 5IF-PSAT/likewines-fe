import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ThemeSwitch from "./ThemeSwitch";
import LiquorIcon from "@mui/icons-material/Liquor";

export default function HomeBar(props: {
  theme: string;
  themeHandler: (theme: string) => void;
}) {
  return (
    <div className="stickytop">
      <AppBar position="relative" color="inherit">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <LiquorIcon color="primary" sx={{ display: "flex", mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              like<strong>wines</strong>
            </Typography>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              like<strong>wines</strong>
            </Typography>
            {/* This box is to push next item to the right */}
            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <ThemeSwitch
                theme={props.theme}
                themeHandler={props.themeHandler}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
