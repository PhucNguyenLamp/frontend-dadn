import { Typography, Box, Paper, Skeleton } from "@mui/material";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Statistics() {
  const [temperature, setTemperature] = useState();
  const [humidity, setHumidity] = useState();
  const [lightIntensity, setLightIntensity] = useState();
  const [distanceSensor, setDistanceSensor] = useState();
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/statistics");
      const data = res.data;
      console.log(data);
      setTemperature(data.temperature_value_time);
      setHumidity(data.humidity_value_time);
      setLightIntensity(data.light_value_time);
      setDistanceSensor(data.distance_value_time);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height={400} />
      ) : (
        <Paper
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignContent: "center",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h5">Temperature (°C)</Typography>
            <LineChart
              xAxis={[
                {
                  data: temperature.time.map(
                    (t) =>
                      new Date(t).getHours() +
                      new Date(t).getMinutes() / 60 +
                      new Date(t).getSeconds() / 3600
                  ),
                },
              ]}
              series={[
                {
                  data: temperature.temperature,
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
              xAxis={[
                {
                  data: humidity.time.map(
                    (t) =>
                      new Date(t).getHours() +
                      new Date(t).getMinutes() / 60 +
                      new Date(t).getSeconds() / 3600
                  ),
                },
              ]}
              series={[
                {
                  data: humidity.humidity,
                  area: true,
                },
              ]}
              width={500}
              height={300}
              colors={["#05192C"]}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h5">Light Intensity (Lux)</Typography>
            <LineChart
              xAxis={[
                {
                  data: lightIntensity.time.map(
                    (t) =>
                      new Date(t).getHours() +
                      new Date(t).getMinutes() / 60 +
                      new Date(t).getSeconds() / 3600
                  ),
                },
              ]}
              series={[
                {
                  data: lightIntensity.light,
                  area: true,
                },
              ]}
              width={500}
              height={300}
              colors={["#CFB53B"]}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h5">Distance Sensor (cm)</Typography>
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
              colors={["lightgray"]}
            />
          </Box>
        </Paper>
      )}
    </>
  );
}
