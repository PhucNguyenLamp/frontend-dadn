import React from "react";
import { Paper, Skeleton, Typography, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IVideo } from "./../interface/type";

export default function Preview(props: { key: string; data: IVideo }) {
  const [liked, setLiked] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [hover, setHover] = useState(false);

  const toggleLike = () => {
    setLiked(!liked); // Toggle like state
  };

  //define the vid model
  const { _id, title, url, tags, likeNum, releaseDate } = props.data;
  const releaseDateString = new Date(releaseDate).toLocaleDateString();

  const navigate = useNavigate();
  return (
    <>
      <Paper
        sx={{
          width: 300,
          height: 268.75,
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
          navigate(`/template/:${_id}`);
        }}
      >
        {!videoLoaded && (
          <Skeleton
            variant="rectangular"
            animation={false}
            width={300}
            height={170}
          />
        )}
        {hover ? (
          <video
            src={`/vidPreview/${_id}.webm`}
            style={{
              width: "300px",
              height: "170px",
              objectFit: "cover",
              display: videoLoaded ? "block" : "none",
            }}
            onLoadedData={() => {
              setVideoLoaded(true);
            }}
            autoPlay
            muted // Để autoplay hoạt động trên hầu hết trình duyệt
            onEnded={(e) => {
              e.currentTarget.currentTime = 0; // Reset về đầu video
              e.currentTarget.play(); // Phát lại
            }}
          />
        ) : (
          <img></img>
        )}
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2">{likeNum} liked </Typography>
        <Typography variant="body2">{releaseDateString} </Typography>

        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            toggleLike();
          }}
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            opacity: liked ? 1 : 0.5,
            transition: "opacity 0.3s ease",
          }}
        >
          <FavoriteIcon color={liked ? "error" : "disabled"} />
        </IconButton>
      </Paper>
    </>
  );
}
