import { Typography, Box, Paper } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { color } from "./../../node_modules/@types/d3-color/index.d";

export default function Statistics() {
  return (
    <Paper sx={{ padding: 2, display: "flex", flexDirection: "row" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h5">Temperature (°C)</Typography>
        <LineChart
          xAxis={[{ data: [0, 2, 4, 6, 8, 10] }]}
          series={[
            {
              data: [22, 23, 21, 24, 25, 23],
              area: true,
            },
          ]}
          width={500}
          height={300}
          colors={["#7a301f"]}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h5">Humidity (%)</Typography>
        <LineChart
          xAxis={[{ data: [0, 2, 4, 6, 8, 10] }]}
          series={[
            {
              data: [60, 65, 63, 70, 68, 64],
              area: true,
            },
          ]}
          width={500}
          height={300}
          colors={["#05192C"]}
        />
      </Box>
    </Paper>
  );
}
