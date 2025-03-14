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

export default function VideoListComponent() {
  const [selectedTab, setSelectedTab] = useState<string>("Nổi bật");
  const [videoData, setVideoData] = useState([]);
  const [numberOfVid, setNumberOfVid] = useState(9); // use for load more video
  const [tagsData, setTagsData] = useState([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(""); // use for search

  const fetchTemplates = async () => {
    try {
      // Fetch tags
      const tagsResponse = await axios.get(`/api/getAllTags`);
      setTagsData(tagsResponse.data.data);
      // Fetch videos based on selected tab and tags
      const params: any = { index: numberOfVid };
      if (selectedTags.length > 0) {
        params.tags = selectedTags;
      }

      if (searchQuery.length > 0) {
        params.searchQuery = searchQuery;
      }

      let videosResponse;

      if (selectedTab === "Nổi bật") {
        videosResponse = await axios.get(`/api/get9VidSortByLiked`, { params }); // get list sorted by lineNum
      } else if (selectedTab === "Mới nhất") {
        videosResponse = await axios.get(`/api/getNext10Vid`, { params }); // get list sorted by RealeseDate
      }

      setVideoData(videosResponse?.data.data || []);
    } catch (error) {
      console.error("Error fetching templates:", error);
      setVideoData([]); // Reset video data on error
    }
  };

  // fetch video template if there was changes
  useEffect(() => {
    fetchTemplates(); // Load video template
  }, [selectedTab, numberOfVid, selectedTags, searchQuery]);

  const handleClick = (_id: string) => {
    if (selectedTags?.includes(_id)) {
      setSelectedTags(selectedTags.filter((t: string) => t !== _id)); // bỏ tag khỏi danh sách
    } else {
      setSelectedTags([...selectedTags, _id]); // thêm tag vào danh sách
    }
  };

  return (
    <>
      <Box className="video-list-container">
        <Paper className="video-list-paper">
          <Typography variant="h5" align="center" sx={{ mb: 3 }}>
            View All Video Template
          </Typography>
          <SearchBar setSearchQuery={setSearchQuery} />
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Tabs
              value={selectedTab}
              onChange={(_e, newValue) => {
                setSelectedTab(newValue);
                setNumberOfVid(9); // Reset index when changing tabs
              }}
              className="video-list-tabs"
            >
              <Tab value="Nổi bật" label="Nổi bật" />
              <Tab value="Mới nhất" label="Mới nhất" />
            </Tabs>

            <Stack direction="row" spacing={1}>
              {tagsData && tagsData.length > 0
                ? tagsData.map((tag: { _id: string; tagName: string }) => (
                    <Chip
                      key={tag._id}
                      label={tag.tagName}
                      onClick={() => handleClick(tag._id)}
                      variant={
                        selectedTags?.includes(tag._id) ? "outlined" : "filled"
                      }
                      className="video-list-chip"
                    />
                  ))
                : null}
            </Stack>
          </Box>
          <Box className="video-list-grid">
            {videoData.length > 0 ? (
              videoData.map(
                (data: {
                  _id: string;
                  title: string;
                  url: string;
                  tags: [string];
                  likeNum: number;
                  releaseDate: Date;
                }) => (
                  <Box className="video-list-preview" key={data._id}>
                    <Preview key={data._id} data={data} />
                  </Box>
                )
              )
            ) : (
              <Typography variant="h6" color="text.secondary">
                No videos available.
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={() => setNumberOfVid(numberOfVid + 9)}
              className="video-list-load-more-btn"
            >
              Load More
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
