import PreviewPanel from "../components/PreviewPanel";
import EditPanel from "../components/EditPanel";
import {
  Box,
  Paper,
  Typography,
  Button,
  Switch,
  Checkbox,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import icons from "../utils/Icons";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const data_init = [
  {
    _id: "1",
    title: "LED #1",
    type: "light_device",
    status: true,
    schedule: {
      from: "6:00",
      to: "18:00",
      type: "repeat",
      repeat: "everyday",
    },
    data: "Brightness: 75%",
  },
  {
    _id: "2",
    title: "Temperature sensor #1",
    type: "temperature",
    status: false,
    schedule: {
      from: "6:00",
      to: "18:00",
      type: "once",
      repeat: "none",
    },
    data: "Temperature: 22°C",
  },
  {
    _id: "3",
    title: "Humidity sensor #1",
    type: "humidity",
    status: true,
    schedule: {
      from: "6:00",
      to: "18:00",
      type: "repeat",
      repeat: "M,F,S",
    },
    data: "Humidity: 45%",
  },
  {
    _id: "4",
    title: "Light sensor #1",
    type: "light",
    status: false,
    schedule: {
      from: "6:00",
      to: "18:00",
      type: "once",
      repeat: "M",
    },
    data: "Light Intensity: 300 lux",
  },
  {
    _id: "5",
    title: "Distance sensor #1",
    type: "distance",
    status: true,
    schedule: {
      from: "6:00",
      to: "18:00",
      type: "repeat",
      repeat: "everyday",
    },
    data: "Distance: 1.5m",
  },
  {
    _id: "6",
    title: "Fan #1",
    type: "fan_device",
    status: false,
    schedule: {
      from: "6:00",
      to: "18:00",
      type: "once",
      repeat: "27/03/2025",
    },
    data: "Speed: 1200 RPM",
  },
];

export default function Devices() {
  const { _id } = useParams();
  const [data, setData] = useState();
  const safe_id = _id?.replace(":", "");

  // lấy thông tin về video bằng Id từ backend
  const getData = (_id) => {
    try {
      const res = data_init.find((item) => item._id == _id);
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (safe_id) {
      getData(safe_id);
    }
  }, []);
  const IconComponent = data ? icons[data.type] : null;

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}
      >
        <Box {{display: 'flex', flexDirection: 'column'}}>


        <Typography variant='h3'>Info</Typography>
        <Paper
          elevation={3}
          sx={{
            flex: 1,
            marginRight: 2,
            padding: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography variant="h4" align="center">
              {data?.title}
            </Typography>
            {IconComponent && <IconComponent fontSize="large" />}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            >
            <Typography variant="h6" color={data?.status ? "success" : "error"}>
              Status: {data?.status ? "On" : "Off"}
            </Typography>
            <Switch
              checked={data?.status}
              onChange={() => setData({ ...data, status: !data?.status })}
              //success color if on, error color if off
              color={data?.status ? "success" : "error"}
              />
          </Box>
          <Box>
            <Typography variant="h6">{data?.data}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h6">Schedule: </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker label="From"/>
              <Typography variant="h6"> - </Typography>
              <TimePicker label="To" />
            </LocalizationProvider>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h6">Repeat:</Typography>
            <Checkbox />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h6">Repeat options:</Typography>
            {["M", "T", "W", "T", "F", "S", "Su"].map((day, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1">{day}</Typography>
                <Checkbox />
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
                </Box>
    </>
  );
}
