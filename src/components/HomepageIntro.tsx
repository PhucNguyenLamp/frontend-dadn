import {
  Box,
  Typography,
} from "@mui/material";
import InfiniteSlider from "./InfiniteSlider";

export default function HomepageIntro() {

  


  return (
    <>
      <Box sx={{ textAlign: "center", my: 4 }}>
        {/* Banner */}
        {/* <Box
          sx={{
            position: "relative",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 2,
            mb: 4,
            overflow: "hidden",
            opacity: "0.4",
            "&:hover": {
              opacity: 1,
              transition: "opacity 0.5s ease-in-out",
            },
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            <source src="/1200X400.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box> */}

        <Box
          sx={{
            position: "relative",
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 2,
            mb: 4,
            overflow: "hidden",
            "&:hover": {
              transform: "scale(1.02)",
              transition: "transform 0.3s ease-in-out",
            },
          }}
        >
          {/* Text Content */}
          <Typography
            variant="h2"
            sx={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              zIndex: 1,
              "&:hover": {
                color: { sm: "primary.main", md: "secondary.main" },
                transition: "color 0.3s ease-in-out",
              },
            }}
          >
            Easily Enhance Your Editing
          </Typography>
        </Box>

        {/* List of YouTubers */}
        {/* <InfiniteSlider /> */}
      </Box>
    </>
  );
}
