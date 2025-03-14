import { Box } from "@mui/material";
import VideoListComponent from "../components/VideoListComponent";
import HomepageIntro from "../components/HomepageIntro";

export default function Home() {
  return (
    <>
      {/* Nội dung trang chủ */}
      <Box
        sx={{
          position: "relative",
          zIndex: 100,
          margin: "auto",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <HomepageIntro />
        <VideoListComponent />
      </Box>
    </>
  );
}
