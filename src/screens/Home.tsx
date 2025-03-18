import { Box } from "@mui/material";
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
        <DeviceListComponent />
      </Box>
    </>
  );
}
