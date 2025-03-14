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

export default function Preview({ data }) {
  const [liked, setLiked] = useState(data.liked);
  const [hover, setHover] = useState(false);
  const [status, setStatus] = useState(data.status);
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
          p: 2,
          m: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => {
          navigate(`/devices/${_id}`);
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
        </Box>
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
              opacity: liked ? 1 : 0.5,
              transition: "opacity 0.3s ease",
            }}
          >
            <FavoriteIcon color={liked ? "error" : "disabled"} />
          </IconButton>
          <Switch checked={status} onChange={(event) => setStatus(event.target.checked)} onClick={e => e.stopPropagation()}/>
        </Box>
      </Paper>
    </>
  );
}
