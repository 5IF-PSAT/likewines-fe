import UserSearchBox from "../components/Home/WineSearchBox";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import Button from "@mui/material/Button";

function Home() {
  const [isCompare, setIsCompare] = useState(true);

  const handleCompareChange = () => {
    setIsCompare(!isCompare);
  };
  return (
    <>
      <div
        style={{
          justifyContent: "center",
          paddingBottom: 20,
          paddingTop: 20,
        }}
      >
        <Box textAlign={"center"}>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Which do you want to do with your wine?
          </Typography>
          <br />
          <Button
            variant="outlined"
            onClick={handleCompareChange}
            sx={{
              width: 100,
            }}
          >
            {isCompare ? "Comparison" : "Prediction"}
          </Button>
        </Box>
        {isCompare ? (
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Search for similar wines to your favorite.
          </Typography>
        ) : (
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Predict the quality of your favorite wine in the future.
          </Typography>
        )}
      </div>
      <UserSearchBox isCompare={isCompare} />
    </>
  );
}

export default Home;
