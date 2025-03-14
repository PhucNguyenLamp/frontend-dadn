import {
  Box,
  Typography,
  Paper,
  Slider,
  Skeleton,
  Button,
  Checkbox,
  FormControlLabel,
  Popover,
  Dialog,
  DialogTitle,
  DialogContent,
  LinearProgress,
  DialogActions,
} from "@mui/material";
import { Canvas, events, ObjectMap, useFrame } from "@react-three/fiber";
import Model from "./Model";
import { useCallback, useEffect, useRef, useState } from "react";
import { IVideo } from "../interface/type";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import { GLTF } from "three/examples/jsm/Addons.js";
import MouseOutlinedIcon from "@mui/icons-material/MouseOutlined";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import CaptureWrapper from "./CaptureWrapper";
import PreviewBackground from "./PreviewBackground";

export default function PreviewPanel(props: {
  _id: string | undefined;
  vidData: IVideo | undefined;
  model: GLTF & ObjectMap;
}) {
  const [time, setTime] = useState(0);
  const [isPlay, setIsPlay] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>(0);
  const [isOrbitControl, setOrbitControl] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [progressBar, setProgressBar] = useState<number>(0);
  const [bufferBar, setBufferBar] = useState<number>(0);
  const [totalFrames, setTotalFrame] = useState<number>(0);
  // xử lí dialog khi export
  const handleClose = () => {
    setIsExporting(false);
    setProgressBar(0);
    setBufferBar(0);
    setTotalFrame(0);
  };

  // nút play
  const playHandler = () => {
    setIsPlay(!isPlay);
  };

  // xử lí timeline
  const timelineHandler = (_event: Event, newValue: number | number[]) => {
    setTime(newValue as number);
  };

  //format thời gian
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const decreaseTime = useCallback(() => {
    setTime((prevTime) => Math.max(prevTime - 0.05, 0)); // Đảm bảo không âm
  }, []);

  const increaseTime = useCallback(() => {
    setTime((prevTime) => prevTime + 0.05);
  }, []);

  //PopOver của checkbox
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  // ccapture
  const canvasRef = useRef();
  const capturer = useRef();
  useEffect(() => {
    capturer.current = new CCapture({
      format: "webm",
      framerate: 60,
      verbose: true,
      quality: 100,
      display: true,
      width: 1920,
      height: 1080,
    });
  }, []);

  const startCapture = () => {
    setIsExporting(true);
    setTime(0);
    setIsPlay(false);
    // wait 0.5 sec to change the frame size
    setTimeout(() => {
      setIsPlay(true);
      capturer.current.start();
    }, 500);
  };
  const stopCapture = useCallback(() => {
    setIsExporting(false);
    capturer.current.stop();
    capturer.current.save();
  }, []);

  useEffect(() => {
    if (isExporting && time >= duration) {
      stopCapture();
    }
  }, [time, duration, isExporting, stopCapture]);
  // SIÊU XUẤT - Supa cum
  // const ffmpeg = new FFmpeg();

  // log ffmpeg
  // ffmpeg.on("progress", (e) => {
  //   setProgressBar(e.progress * 100);
  // });

  // const loadFFmpeg = async () => {
  //   if (!ffmpeg.loaded) {
  //     await ffmpeg.load();
  //     console.log("FFmpeg loaded successfully");
  //   }
  // };

  // export thành video
  // const exportVideo = async () => {
  //   try {
  //     setIsExporting(true);

  //     await loadFFmpeg();

  //     // đảm bảo load được canvas
  //     const canvas = document.querySelector("canvas");
  //     if (!canvas) {
  //       console.error("Canvas không tìm thấy!");
  //       return;
  //     }

  //     const frameRate = 60; // FPS
  //     const totalFrames = frameRate * duration;
  //     setTotalFrame(totalFrames);
  //     console.log(totalFrames);
  //     const frames: string[] = [];
  //     const calUnit = 100 / totalFrames;
  //     const previewContainer = document.getElementById("previewContainer");
  //     const previewImage = document.createElement("img");
  //     previewImage.style.width = "160px";
  //     previewImage.style.height = "90px";

  //     previewContainer?.appendChild(previewImage);

  //     for (let i = 0; i <= totalFrames; i++) {
  //       await new Promise((resolve) => setTimeout(resolve, 1000 / frameRate));

  //       const dataURL = canvas.toDataURL("image/png");
  //       const blob = await (await fetch(dataURL)).blob();
  //       const fileName = `frame_${i.toString().padStart(4, "0")}.png`;
  //       setBufferBar((prev) => prev + calUnit);
  //       previewImage.src = dataURL;

  //       try {
  //         await ffmpeg.writeFile(fileName, await fetchFile(blob));
  //         frames.push(fileName);
  //       } catch (error) {
  //         console.error(`Lỗi khi ghi file ${fileName}:`, error);
  //       }
  //     }

  //     try {
  //       // Chuyển đổi png → MP4
  //       await ffmpeg.exec([
  //         "-progress",
  //         "log.txt",
  //         "-framerate",
  //         `${frameRate}`, // Thiết lập tốc độ khung hình (FPS)
  //         "-i",
  //         "frame_%04d.png", // Định dạng tên file đầu vào
  //         "-c:v",
  //         "libx264", // Sử dụng codec H.264
  //         "-pix_fmt",
  //         "yuv420p", // Định dạng pixel
  //         "-crf",
  //         "1", // Chất lượng video
  //         "output.mp4", // Tên file video đầu ra
  //       ]);
  //     } catch (error) {
  //       console.error("Lỗi khi chạy FFmpeg exec:", error);
  //     }

  //     // Đọc dữ liệu video
  //     const data = await ffmpeg.readFile("output.mp4");
  //     const buffer = data as Uint8Array;

  //     // Tạo Object URL để tải về
  //     const url = URL.createObjectURL(
  //       new Blob([buffer], { type: "video/mp4" })
  //     );

  //     // Tạo link tải về
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = "output.mp4";
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);

  //     // đóng dialog
  //     handleClose();
  //   } catch (error) {
  //     console.error("Lỗi trong quá trình export video:", error);
  //   }
  // };

  return (
    <>
      {/* {isExporting ? (
        <>
          <Dialog open={isExporting} maxWidth="sm" fullWidth>
            <DialogTitle> Exporting Video </DialogTitle>
            <DialogContent>
              <div
                id="previewContainer"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              ></div>
              <Typography> exporting video ... </Typography>
              <LinearProgress
                variant="buffer"
                value={progressBar}
                valueBuffer={bufferBar}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </>
      ) : null} */}

      <Button onClick={startCapture}>EXPORT</Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: isExporting ? 1920 : "100vh",
          height: isExporting ? 1080 : "56.25vh",
          padding: 0.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "5px",
          }}
        >
          <Typography variant="h5">{props.vidData?.title}</Typography>
          <FormControlLabel
            label="Orbit contol"
            control={
              <Checkbox
                onChange={() => setOrbitControl((prev) => !prev)}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
              />
            }
          />
        </Box>

        <Paper
          elevation={3}
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1e1e1e",
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
          }}
        >
          {props.vidData ? (
            <>
              <Canvas
                id="canvas"
                ref={canvasRef}
                gl={{
                  preserveDrawingBuffer: true,
                }}
              >
                <CaptureWrapper
                  isExporting={isExporting}
                  capturer={capturer.current}
                  canvasRef={canvasRef}
                />

                <Model
                  _id={props.vidData?._id}
                  model={props.model}
                  isPlay={isPlay}
                  time={time}
                  setTime={setTime}
                  setDuration={setDuration}
                  isOrbitControl={isOrbitControl}
                />
                <PreviewBackground color={"#1e1e1e"} />
              </Canvas>
            </>
          ) : (
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={1920}
              height={1920}
            />
          )}
        </Paper>

        <Typography variant="body1" sx={{ marginTop: 2, textAlign: "center" }}>
          Suc vat bien ©2025
        </Typography>
      </Box>

      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: " 60vh ", display: "flex", alignItems: "center" }}>
          <Typography marginRight={2}>{formatTime(0)}</Typography>
          <Slider
            min={0}
            max={duration}
            step={0.01}
            value={time}
            onChange={timelineHandler}
          />
          <Typography marginLeft={2}> {formatTime(duration)} </Typography>
        </Box>

        <Box>
          <Button onClick={decreaseTime}>
            <KeyboardDoubleArrowLeftRoundedIcon />
          </Button>
          <Button onClick={playHandler}>
            {isPlay ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
          </Button>
          <Button onClick={increaseTime}>
            <KeyboardDoubleArrowRightRoundedIcon />
          </Button>
        </Box>
        <Popover
          id="mouse-over-popover"
          sx={{ pointerEvents: "none" }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1 }}>
            <MouseOutlinedIcon /> HOLD <br></br>
            <b>leftclick:</b> change perspective <br></br>
            <b>rightclick:</b> move camera
          </Typography>
        </Popover>
      </Box>
    </>
  );
}
