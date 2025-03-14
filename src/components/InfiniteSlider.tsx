import { Box, Typography, Chip, Stack } from "@mui/material";
import "./../css/youtuberSlider.css";

export default function InfiniteSlider() {
  // Dummy data for YouTubers list
  const youtubers = Array.from({ length: 10 }, (_, i) => ({
    name: `YouTuber ${i + 1}`,
    image:
      "https://yt3.googleusercontent.com/fNJvy_Nxdo0O2nzV_Ubd2x2HP30FUexMxWwIWnGKQTSuy5r7nRMSfl8fC-m0dK6TANdkZRnXug=s160-c-k-c0x00ffffff-no-rj",
    subscribe: Math.floor(Math.random() * 1000000),
    position: i + 1,
  }));  

  return (
    <>
      <hr
        style={{
          position: "relative",
          color: "gray",
          height: 5,
        }}
      />
      <Typography
        sx={{
          p: 4,
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
        Partner Creator
      </Typography>

      <Box
        className="ytslider"
        sx={{
          "--quantity": "10",
          "--width": "250px", // Set width for animation
          "--height": "100px", // Set height for animation
        }}
      >
        <Stack className="ytlist" direction="row" spacing={2}>
          {youtubers.map((youtuber, index) => (
            <Box
              key={index} // Added key here
              className="ytitem"
              sx={{
                p: 1,
                "--position": `${youtuber.position}`, // Custom property for animation
                "&:hover": {
                  transform: "scale(1.1)",
                  transition: "all 0.3s ease-in-out",
                },
              }}
            >
              <Chip
                avatar={
                  <img
                    src={youtuber.image}
                    alt={youtuber.name}
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "45px",
                    }}
                  />
                }
                label={youtuber.name}
                variant="outlined"
                sx={{
                  width: "180px",
                  px: 2,
                  py: 3,
                  fontSize: "1.2rem",
                  "&:hover": {
                    backgroundColor: "red",
                    color: "#000",
                    transform: "scale(1.1)",
                    transition: "all 0.3s ease-in-out",
                  },
                }}
              />
              {/* h5 */}
              <Typography sx={{ color: "white" }}>
                {youtuber.subscribe} SUBSCRIBER
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
      <hr
        style={{
          position: "relative",
          color: "gray",
          height: 5,
        }}
      />
    </>
  );
}
