import PreviewPanel from "../components/PreviewPanel";
import EditPanel from "../components/EditPanel";
import { Box, Paper, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IVideo } from "../interface/type";
import axios from "axios";
import { useGLTF } from "@react-three/drei";
import { ObjectMap } from "@react-three/fiber";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function Template() {
  const { _id } = useParams<string>();
  const [vidData, setVidData] = useState<IVideo>();

  const safe_id = _id?.replace(":", ""); // xoá dấu : ở param _id
  // Load model
  const gltf = useGLTF(`/gltf/${safe_id}.gltf`);

  /**
   *  nodeList sẽ vào preview panel để hiển thị từng object
   *  setNodeList sẽ vào edit Panel để thay đổi thông số của object
   *
   *
   *
   *
   */
  const [model, setModel] = useState<GLTF & ObjectMap>(
    gltf as unknown as GLTF & ObjectMap
  ); // cách ép kiểu dâm tà

  // lấy thông tin về video bằng Id từ backend
  const getvideoData = async (_id: string) => {
    try {
      const response = await axios.get("/api/getVidById", { params: { _id } });
      setVidData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch video data", error);
    }
  };

  useEffect(() => {
    if (safe_id) {
      getvideoData(safe_id);
    }
  }, [safe_id]);

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}
      >
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
          <PreviewPanel _id={vidData?._id} vidData={vidData} model={model} />
        </Paper>
        <Paper
          elevation={3}
          sx={{
            flex: 1,
            padding: 2,
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)", // Shadow for depth
          }}
        >
          <EditPanel model={model} setModel={setModel} />
        </Paper>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Button variant='outlined'>View More Template</Button>
      </Box>
    </>
  );
}
