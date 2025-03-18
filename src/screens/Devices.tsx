import PreviewPanel from "../components/PreviewPanel";
import EditPanel from "../components/EditPanel";
import {
  Box,
  Paper,
  Typography,
  Button,
  Switch,
  Checkbox,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  TextField,
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
    title: "LED",
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
    title: "Temperature & Humidity sensor",
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
    title: "Light sensor",
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
    title: "Distance sensor",
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
    title: "Fan",
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
  const { type } = useParams();
  const [data, setData] = useState();
  const [fromTime, setFromTime] = useState();
  const [toTime, setToTime] = useState();
  const [repeat, setRepeat] = useState();
  const [repeatOptions, setRepeatOptions] = useState([]);
  const [condition, setCondition] = useState();
  const [value, setValue] = useState();
  const [automationData, setAutomationData] = useState([]);

  // lấy thông tin về video bằng Id từ backend
  const getData = (type) => {
    try {
      const res = axios.get(`http://localhost:5000/${type}`);
      // const res = data_init.find((item) => item.type == type);
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(type);
  }, []);
  const IconComponent = data ? icons[data.type] : null;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: 2,
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h3">Info</Typography>
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
              <Typography
                variant="h6"
                color={data?.status ? "success" : "error"}
              >
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
          </Paper>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h3">Schedule</Typography>
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
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="h6">Time: </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker label="From" />
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

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h3">Automation</Typography>
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
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="h6">When </Typography>
              <FormControl>
                <InputLabel id="data">Data</InputLabel>
                <Select labelId="Data" label="Data" sx={{ minWidth: 140 }}>
                  <MenuItem value={"temperature"}>Temperature</MenuItem>
                  <MenuItem value={"humidity"}>Humidity</MenuItem>
                  <MenuItem value={"light"}>Light level</MenuItem>
                  <MenuItem value={"distance"}>Distance</MenuItem>
                </Select>
              </FormControl>
              <Typography variant="h6">is </Typography>
              <FormControl>
                <InputLabel id="condition">Condition</InputLabel>
                <Select
                  labelId="Condition"
                  label="Condition"
                  sx={{ minWidth: 110 }}
                >
                  <MenuItem value={"<"}>&lt;</MenuItem>
                  <MenuItem value={">"}>&gt;</MenuItem>
                  <MenuItem value={"="}>=</MenuItem>
                </Select>
              </FormControl>
              <Typography variant="h6"> </Typography>
              <TextField label="Value" sx={{ width: 120 }} />
              <Typography variant="h6"> </Typography>
              <Button variant="contained" color="primary">
                Add
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
}
