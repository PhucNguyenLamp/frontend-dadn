import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Paper,
  Chip,
  Stack,
} from "@mui/material";
import Preview from "../components/Preview";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import axios from "axios";
import "./../css/VideoListComponent.css";

// LOCATIONS?
const devices_init = [
  { _id: "1", title: "LED #1", type: "light_device", liked: true, status: true },
  {
    _id: "2",
    title: "Temperature sensor #1",
    type: "temperature",
    liked: false,
    status: false,
  },
  { _id: "3", title: "Humidity sensor #1", type: "humidity", liked: false, status: true },
  { _id: "4", title: "Light sensor #1", type: "light", liked: true, status: false },
  { _id: "5", title: "Distance sensor #1", type: "distance", liked: false, status: true },
  { _id: "6", title: "Fan #1", type: "fan_device", liked: false, status: false },
];

export default function VideoListComponent() {
  const [devices, setDevices] = useState(devices_init);
  const [searchQuery, setSearchQuery] = useState<string>(""); // use for search

  const fetchDevices = async () => {};

  // fetch video template if there was changes
  useEffect(() => {
    fetchDevices(); // Load video template
  }, []);

  return (
    <>
      <Box className="video-list-container">
        <Paper className="video-list-paper">
          <SearchBar setSearchQuery={setSearchQuery} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          ></Box>
          <Box className="video-list-grid">
            {devices.length > 0 ? (
              devices.map((data) => (
                <Box className="video-list-preview" key={data._id}>
                  <Preview data={data} />
                </Box>
              ))
            ) : (
              <Typography variant="h6" color="text.secondary">
                No devices available.
              </Typography>
            )}
          </Box>
        </Paper>
      </Box>
    </>
  );
}
