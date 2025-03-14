import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

const CaptureWrapper = ({ isExporting, capturer, canvasRef }) => {

    useFrame((state) => {
        if (isExporting) {
            capturer.capture(canvasRef.current);
        }
    });

  return null;
};

export default CaptureWrapper;