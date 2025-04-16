import { useEffect, useState } from "react";
import {
  Paper,
  Skeleton,
  Typography,
  IconButton,
  Switch,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import icons from "../utils/Icons";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import api from "../api/axios";

const device_map = {
  fan_device: "FAN_1",
  light_device: "LED_1",
};

export default function Preview({ data }) {
  const [liked, setLiked] = useState(data.liked);
  const [hover, setHover] = useState(false);
  const [status, setStatus] = useState(data.data.status);
  const [sensorData, setSensorData] = useState(data.data);

  const [update, setUpdate] = useState(false);

  const updateDevice = async (deviceId, status) => {
    const device_name = device_map[data.type];
    console.log(device_name, status);
    try {
      const res = await api.post("/device_status", {
        _id: device_name,
        status,
        data:
          device_name === "FAN_1" ? sensorData.fanspeed : sensorData.ledcolor,
      });
      const data = await res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateDevice(data.type, status);
  }, [update]);

  useEffect(() => {
    setLiked(data.liked);
    setStatus(data.data.status);
    setSensorData(data.data);
  }, [data]);

  const toggleLike = () => {
    setLiked(!liked); // Toggle like state
  };
  //define the vid model
  const { _id, title, type } = data;
  const IconComponent = icons[type];
  const navigate = useNavigate();
  return (
    <>
      <Paper
        sx={{
          width: 300,
          m: 1,
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => {
          navigate(`/devices/${type}`);
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            noWrap
            sx={{
              fontSize: "clamp(12px, 5vw, 20px)",
            }}
          >
            {title}
          </Typography>
          <IconComponent />
          {type === "temperature_humidity" && <WaterDropIcon />}
        </Box>
        {/* 🔹 Dynamic Sensor Data Display */}
        {type === "temperature_humidity" && (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" sx={{ color: "text.secondary" }}>
              {sensorData.temperature ?? "N/A"}°C
            </Typography>
            {/* <Typography variant="h6" sx={{ color: "text.secondary" }}>
              {"/"}
            </Typography> */}
            <Typography variant="h6" sx={{ color: "text.secondary" }}>
              {sensorData.humidity ?? "N/A"}%
            </Typography>
          </Box>
        )}

        {type === "light_device" && (
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            {sensorData.ledcolor ?? "N/A"}
          </Typography>
        )}

        {type === "light" && (
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            {sensorData.lightsensor ?? "N/A"} lux
          </Typography>
        )}

        {type === "fan_device" && (
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            {sensorData.fanspeed ?? "N/A"} rpm
          </Typography>
        )}

        {type === "distance" && (
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            {sensorData.distancesensor ?? "N/A"} cm
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              toggleLike();
            }}
            sx={{
              // position: "absolute",
              // bottom: 8,
              // right: 8,
              opacity: liked ? 0 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <FavoriteIcon color={liked ? "error" : "disabled"} />
          </IconButton>
          {/*  if status not null */}
          {status != null && (
            <Switch
              checked={Boolean(status === "ON")}
              onChange={(event) => {
                setSensorData((prevData) => {
                  if (status === "ON" && data.type === "fan_device") {
                    return { ...prevData, fanspeed: 0 };
                  } else if (status === "ON") {
                    return { ...prevData, ledcolor: "#000000" };
                  } else {
                    return prevData;
                  }
                });
                setStatus(status === "ON" ? "OFF" : "ON");
                setUpdate(!update);
              }}
              onClick={(e) => e.stopPropagation()}
              color={status ? "success" : "error"}
            />
          )}
        </Box>
      </Paper>
    </>
  );
}
