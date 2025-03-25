import { Box, Typography } from "@mui/material";
import DeviceListComponent from "../components/DeviceListComponent";

export default function Home() {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          zIndex: 100,
          margin: "auto",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Typography variant="h3" sx={{align: "center"}}>Welcome to Smart Office Room</Typography>
        <DeviceListComponent />
      </Box>
    </>
  );
}
