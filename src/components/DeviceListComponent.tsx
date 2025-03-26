import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Paper,
  Chip,
  Stack,
  Skeleton,
} from "@mui/material";
import Preview from "../components/Preview";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import axios from "axios";
import "./../css/VideoListComponent.css";

let devices_init = [
  {
    title: "LED",
    type: "light_device",
    liked: true,
  },
  {
    title: "Temperature & humidity sensor",
    type: "temperature_humidity",
    liked: false,
  },
  {
    title: "Light sensor",
    type: "light",
    liked: true,
  },
  {
    title: "Distance sensor",
    type: "distance",
    liked: false,
  },
  {
    title: "Fan",
    type: "fan_device",
    liked: false,
  },
];

export default function DeviceListComponent() {
  const [devices, setDevices] = useState();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("device");
  // device or sensor

  const fetchDevices = async () => {
    try {
      const res = await axios.get("http://localhost:5000");
      const data = res.data;
      console.log(data);
      const updatedDevices = devices_init.map((device) => ({
        ...device,
        data: data[device.type] || {}, // Assign entire data object or empty
      }));
      setDevices(updatedDevices);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // fetch video template if there was changes
  useEffect(() => {
    fetchDevices(); // Load video template
  }, []);

  return (
    <>
      <Box className="video-list-container">
        <Paper className="video-list-paper">
          <SearchBar setSearchQuery={setSearchQuery} />
          <Tabs
            value={selectedTab}
            onChange={(_e, newValue) => {
              setSelectedTab(newValue);
            }}
            className="video-list-tabs"
          >
            <Tab value="device" label="Devices" />
            <Tab value="sensor" label="Sensors" />
          </Tabs>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          ></Box>
          <Box className="video-list-grid">
            {loading
              ? Array.from(new Array(5)).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    width={210}
                    height={118}
                    style={{ margin: "10px" }}
                  />
                ))
              : // filter based on tab
                // if tab is device, filter fan_device light_device
                // if tab is sensor, filter light temperature_humidity distance\
                devices ? 
                devices
                  .filter((data) =>
                    selectedTab === "device"
                      ? ["fan_device", "light_device"].includes(data.type)
                      : selectedTab === "sensor"
                      ? ["light", "temperature_humidity", "distance"].includes(
                          data.type
                        )
                      : false
                  )
                  .filter((data) =>
                    searchQuery.trim() === ""
                      ? true
                      : data.title
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                  )
                  .map((data) => (
                    <Box className="video-list-preview" key={data.type}>
                      <Preview data={data} />
                    </Box>
                  ))
                : <Typography>No devices found</Typography>
                }
          </Box>
        </Paper>
      </Box>
    </>
  );
}
