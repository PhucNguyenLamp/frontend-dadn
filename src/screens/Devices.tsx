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
  Skeleton,
  Slider,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import icons from "../utils/Icons";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import DeleteIcon from "@mui/icons-material/Delete";

dayjs.extend(utc);
dayjs.extend(timezone);

const data_init = [
  {
    title: "LED",
    type: "light_device",
  },
  {
    title: "Temperature & Humidity sensor",
    type: "temperature_humidity",
  },
  {
    title: "Light sensor",
    type: "light",
  },
  {
    title: "Fan",
    type: "fan_device",
  },
];
const device_map = {
  fan_device: "FAN_1",
  light_device: "LED_1",
};
export default function Devices() {
  const { type } = useParams();
  const [data, setData] = useState({});
  // schedule
  const [time, setTime] = useState(new Date());
  const [to, setTo] = useState(new Date(new Date().getTime() + 30 * 60000));
  const [repeat, setRepeat] = useState(false);
  const [repeatOptions, setRepeatOptions] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [selectedAction, setSelectedAction] = useState("");
  const [actionValue, setActionValue] = useState("");

  // automation
  const [automationData, setAutomationData] = useState([]);
  const [automationCondition, setAutomationCondition] = useState("");
  const [automationValue, setAutomationValue] = useState("");
  const [automationDo, setAutomationDo] = useState("");
  const [automationDevice, setAutomationDevice] = useState("");
  const [automationDeviceValue, setAutomationDeviceValue] = useState("");

  const [scheduleList, setScheduleList] = useState([]);
  const [automationList, setAutomationList] = useState([]);

  // update helper
  const [update, setUpdate] = useState(false);
  // loading state
  const [loading, setLoading] = useState(true);
  const firstLoadRef = useRef(true);
  
  const getData = async (type) => {
    try {
      const res = await axios.get(`http://localhost:5000/${type}`);
      let { status, data, schedule, automation } = res.data;
      // temporary fix for schedule
      
      

      const device = data_init.find((item) => item.type === type);
      const update_device = { ...device, status, data, schedule, automation };

      console.log(res.data);

      setData(update_device);
      if (firstLoadRef.current) {
        setScheduleList(schedule);
        setAutomationList(automation);
        setAutomationDevice(res.data.devicename === "fan_device" ? "fan" : "led");
        setLoading(false);
      }
      firstLoadRef.current = false;
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/device_status`, {
        _id: device_map[type],
        status: data.status,
        data: data.data.fanspeed
          ? Number(data.data.fanspeed)
          : data.data.ledcolor,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addSchedule = async () => {
    try {
      const schedule = {
        _id: device_map[type],
        schedule: [...scheduleList, { time, to, repeat, repeatOptions, selectedAction, actionValue }],
      };
      setScheduleList((prev) => schedule.schedule)
      const res = await axios.post(`http://localhost:5000/schedule`, schedule);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSchedule = async (updatedList) => {
    try {
      const schedule = {
        _id: device_map[type],
        schedule: updatedList,
      };
      const res = await axios.post(`http://localhost:5000/schedule`, schedule);
    } catch (error) {
      console.log(error);
    }
  }

  const addAutomation = async () => {
    try {
      const automation = {
        _id: device_map[type],
        automation: [...automationList, { data: automationData, condition: automationCondition, value: automationValue, do: automationDo, device: automationDevice, deviceValue: automationDeviceValue }],
      };
      setAutomationList((prev) => automation.automation)
      const res = await axios.post(`http://localhost:5000/automation`, automation);
    } catch (error) {
      console.log(error);
    }
  }

  const updateAutomation = async (updatedList) => {
    try {
      const automation = {
        _id: device_map[type],
        automation: updatedList,
      };
      const res = await axios.post(
        `http://localhost:5000/automation`,
        automation
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(type);

    let interval = setInterval(() => {
      getData(type);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    updateData();
  }, [update]);

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
        {loading ? (
          <Skeleton variant="rectangular" height={"50vh"} />
        ) : (
          <>
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
                    {data.title}
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
                  {data.status != null && (
                    <>
                      <Typography
                        variant="h6"
                        color={data.status === "ON" ? "success" : "error"}
                      >
                        Status: {data.status === "ON" ? "On" : "Off"}
                      </Typography>
                      <Switch
                        checked={Boolean(data?.status === "ON")}
                        onChange={() => {
                          const newStatus = data.status === "ON" ? "OFF" : "ON";
                          const updatedData =
                            newStatus === "OFF" && type === "light_device"
                              ? {
                                  ...data,
                                  status: newStatus,
                                  data: { ...data.data, ledcolor: "#000000" },
                                }
                              : {
                                  ...data,
                                  status: newStatus,
                                  data: { ...data.data, fanspeed: 0 },
                                };
                          setData(updatedData);
                          setUpdate(!update);
                        }}
                        //success color if on, error color if off
                        color={data.status === "ON" ? "success" : "error"}
                      />
                    </>
                  )}
                </Box>
                {/* 🔹 Dynamic Sensor Data Display */}
                {type === "temperature_humidity" && (
                  <Box sx={{ display: "flex" }}>
                    <Typography variant="h6" sx={{ color: "text.secondary" }}>
                      {data.data.temperature ?? "N/A"}°C
                    </Typography>
                    <Typography variant="h6" sx={{ color: "text.secondary" }}>
                      {"/"}
                    </Typography>
                    <Typography variant="h6" sx={{ color: "text.secondary" }}>
                      {data.data.humidity ?? "N/A"}%
                    </Typography>
                  </Box>
                )}

                {type === "light_device" && (
                  <>
                    <Typography variant="h6" sx={{ color: "text.secondary" }}>
                      LED Color:
                    </Typography>
                    <TextField
                      type="color"
                      value={data.data.ledcolor ?? "#000000"}
                      onChange={(e) => {
                        const newColor = e.target.value;
                        setData({
                          ...data,
                          status: newColor === "#000000" ? "OFF" : "ON",
                          data: { ...data.data, ledcolor: newColor },
                        });
                        setUpdate(!update);
                      }}
                      sx={{ width: 100 }}
                    />
                  </>
                )}

                {type === "light" && (
                  <Typography variant="h6" sx={{ color: "text.secondary" }}>
                    {data.data.lightsensor ?? "N/A"} lux
                  </Typography>
                )}

                {type === "fan_device" && (
                  <>
                    <Typography variant="h6" sx={{ color: "text.secondary" }}>
                      {data.data.fanspeed ?? "N/A"} RPM
                    </Typography>
                    <Slider
                      onChange={(e, newvalue) => {
                        if (newvalue == 0)
                          setData({
                            ...data,
                            status: "OFF",
                            data: { fanspeed: newvalue },
                          });
                        else
                          setData({
                            ...data,
                            status: "ON",
                            data: { fanspeed: newvalue },
                          });
                        setUpdate(!update);
                      }}
                      value={data.data.fanspeed}
                      aria-label="Fan speed slider"
                      sx={{ width: 200 }}
                    />
                  </>
                )}
              </Paper>
            </Box>
            {type === "light_device" || type === "fan_device" ? (
              <>
                {/* TODO: FIX SCHEDULE RANGE */}
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
                    {/* map devices added schedule here */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Typography variant="h6">Time: </Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          label="From"
                          value={dayjs(time)}
                          onChange={(newValue) => {
                            setTime(newValue.toDate());
                          }}
                        />
                      </LocalizationProvider>
                      <Typography variant="h6"> - </Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          label="To"
                          value={dayjs(to)}
                          onChange={(newValue) => {
                            setTo(newValue.toDate());
                          }}
                        />
                      </LocalizationProvider>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Typography variant="h6">Repeat:</Typography>
                      <Checkbox
                        checked={repeat}
                        onChange={(e) => setRepeat(e.target.checked)}
                      />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="h6">Day:</Typography>
                      {["M", "T", "W", "T", "F", "S", "Su"].map(
                        (day, index) => (
                          <Box
                            key={index}
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <Typography variant="body1">{day}</Typography>
                            <Checkbox
                              checked={repeatOptions[index] || false}
                              onChange={(e) => {
                                const updatedOptions = [...repeatOptions];
                                updatedOptions[index] = e.target.checked;
                                setRepeatOptions(updatedOptions);
                              }}
                            />
                          </Box>
                        )
                      )}
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="h6">Action:</Typography>
                      <FormControl>
                        <InputLabel id="action">Action</InputLabel>
                        <Select
                          labelId="Action"
                          label="Action"
                          value={selectedAction}
                          sx={{ minWidth: 110 }}
                          onChange={(e) => setSelectedAction(e.target.value)}
                        >
                          <MenuItem value={"turn_on"}>Turn on</MenuItem>
                          <MenuItem value={"turn_off"}>Turn off</MenuItem>
                          <MenuItem value={"set_value"}>Set value</MenuItem>
                        </Select>
                      </FormControl>
                      {selectedAction === "set_value" && (
                        <>
                          {type === "fan_device" && (
                            <TextField
                              label="Value"
                              type="number"
                              inputProps={{ min: 0, max: 100 }}
                              value={actionValue}
                              onChange={(e) =>
                                setActionValue(Number(e.target.value))
                              }
                              sx={{ width: 120 }}
                            />
                          )}
                          {type === "light_device" && (
                            <TextField
                              label="Value"
                              type="color"
                              value={actionValue || "#000000"}
                              onChange={(e) => setActionValue(e.target.value)}
                              sx={{ width: 120 }}
                            />
                          )}
                        </>
                      )}
                    </Box>
                    <Box>
                      {/* save button */}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={addSchedule}
                      >
                        ADD
                      </Button>
                    </Box>
                    {/* List of added schedules */}
                    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                      <Table aria-label="schedule list">
                        <TableHead>
                          <TableRow>
                            <TableCell>Time</TableCell>
                            <TableCell>Repeat</TableCell>
                            <TableCell>Days</TableCell>
                            <TableCell>Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {scheduleList.map((schedule, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                {`${getTimeString(
                                  new Date(schedule.time)
                                )} - ${getTimeString(new Date(schedule.to))}`}
                              </TableCell>
                              <TableCell>
                                {schedule.repeat ? "Yes" : "No"}
                              </TableCell>
                              <TableCell>
                                {daysArrayToString(schedule.repeatOptions)}
                              </TableCell>
                              <TableCell>
                                {getAction(
                                  schedule.selectedAction,
                                  schedule.actionValue
                                )}
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="outlined"
                                  color="error"
                                  onClick={() => {
                                    const updatedList = scheduleList.filter(
                                      (_, i) => i !== index
                                    );
                                    setScheduleList(updatedList);
                                    updateSchedule(updatedList);
                                  }}
                                >
                                  <DeleteIcon />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
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
                        <Select
                          labelId="Data"
                          label="Data"
                          sx={{ minWidth: 140 }}
                          value={automationData}
                          onChange={(e) => setAutomationData(e.target.value)}
                        >
                          <MenuItem value={"temperature"}>Temperature</MenuItem>
                          <MenuItem value={"humidity"}>Humidity</MenuItem>
                          <MenuItem value={"light"}>Light level</MenuItem>
                        </Select>
                      </FormControl>
                      <Typography variant="h6">is </Typography>
                      <FormControl>
                        <InputLabel id="condition">Condition</InputLabel>
                        <Select
                          labelId="Condition"
                          label="Condition"
                          sx={{ minWidth: 110 }}
                          value={automationCondition}
                          onChange={(e) =>
                            setAutomationCondition(e.target.value)
                          }
                        >
                          <MenuItem value={"<"}>&lt;</MenuItem>
                          <MenuItem value={">"}>&gt;</MenuItem>
                          <MenuItem value={"="}>=</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        label="Value"
                        type="number"
                        sx={{ width: 120 }}
                        value={automationValue}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          const clamped = Math.min(100, Math.max(0, val)); // Clamp between 0 and 100
                          setAutomationValue(clamped);
                        }}
                        slotProps={{
                          input: {
                            min: 0,
                            max: 100,
                          },
                        }}
                      />
                      <Typography variant="h6">, </Typography>
                      <FormControl>
                        <InputLabel id="do">Do</InputLabel>
                        <Select
                          labelId="Do"
                          label="Do"
                          sx={{ minWidth: 110 }}
                          value={automationDo}
                          onChange={(e) => setAutomationDo(e.target.value)}
                        >
                          <MenuItem value={"turn_on"}>Turn on</MenuItem>
                          <MenuItem value={"turn_off"}>Turn off</MenuItem>
                          <MenuItem value={"set_value"}>Set value</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <InputLabel id="device">Device</InputLabel>
                        <Select
                          labelId="Device"
                          label="Device"
                          sx={{ minWidth: 110 }}
                          value={automationDevice}
                          disabled
                          onChange={(e) => setAutomationDevice(e.target.value)}
                        >
                          <MenuItem value={"fan"}>Fan</MenuItem>
                          <MenuItem value={"led"}>LED</MenuItem>
                        </Select>
                      </FormControl>
                      {automationDo === "set_value" && (
                        <>
                          {automationDevice === "fan" ? (
                            <TextField
                              label="Value"
                              type="number"
                              sx={{ width: 120 }}
                              value={automationDeviceValue}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                const clamped = Math.min(100, Math.max(0, val)); // Clamp between 0 and 100
                                setAutomationDeviceValue(clamped);
                              }}
                              slotProps={{
                                input: {
                                  min: 0,
                                  max: 100,
                                },
                              }}
                            />
                          ) : (
                            <TextField
                              label="Value"
                              type="color"
                              sx={{ width: 120 }}
                              value={"#000000"}
                              onChange={(e) =>
                                setAutomationDeviceValue(e.target.value)
                              }
                            />
                          )}
                        </>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={addAutomation}
                      >
                        ADD
                      </Button>
                    </Box>
                    {/* List of added schedules */}
                    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                      <Table aria-label="schedule list">
                        <TableHead>
                          <TableRow>
                            <TableCell>Data</TableCell>
                            <TableCell>Condition</TableCell>
                            <TableCell>Value</TableCell>
                            <TableCell>Do</TableCell>
                            <TableCell>Device</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {automationList.map((automation, index) => (
                            <TableRow key={index}>
                              <TableCell>{automation.data}</TableCell>
                              <TableCell>{automation.condition}</TableCell>
                              <TableCell>{automation.value}</TableCell>
                              <TableCell>{getAction(automation.do, automation.deviceValue)}</TableCell>
                              <TableCell>{automation.device}</TableCell>
                              <TableCell>
                                <Button
                                  variant="outlined"
                                  color="error"
                                  onClick={() => {
                                    const updatedList = automationList.filter(
                                      (_, i) => i !== index
                                    );
                                    setAutomationList(updatedList);
                                    updateAutomation(updatedList);
                                  }}
                                >
                                  <DeleteIcon />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Box>
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </Box>
    </>
  );
}

function daysArrayToString(daysArray) {
  const days = ["M", "T", "W", "Th", "F", "S", "Su"];
  return daysArray
    .map((value, index) => (value ? days[index] : ""))
    .filter(Boolean)
    .join(", ");
}
function getTimeString(date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function getAction(action, value) {
  // selectedAction
  // value
  const actionMap = {
    turn_on: "Turn on",
    turn_off: "Turn off",
    set_value: `Set value to ${value}`,
  };
  return actionMap[action];
}