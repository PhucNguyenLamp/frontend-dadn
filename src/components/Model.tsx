import { ObjectMap, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Object3DEventMap } from "three";

/**
 *--------------------------------------------------------------------------------------------------------------|
 *--------------------------------------------------------------------------------------------------------------|
 *-------- SETUP ZONE ----------------- SETUP ZONE ----------------- SETUP ZONE ----------------- SETUP ZONE ---|
 *--------------------------------------------------------------------------------------------------------------|
 *--------------------------------------------------------------------------------------------------------------|
 *
 *
 * các object CÓ THỂ ĐIỀU CHỈNH cần đặt tên bắt đầu bằng 'object'
 *
 * ví dụ: object.001, object.002, ...
 *
 * bởi vì tên của object là DUY NHẤT nên không xảy ra trùng nhau
 * tên object cũng là key để get nodes trong threejs/fiber
 *
 *
 *
 */
export default function Model(props: {
  _id: string;
  model: GLTF & ObjectMap;
  isPlay: boolean;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  isOrbitControl: boolean;
  isExporting: boolean;
  capturer: any;
}) {
  // tải lên model
  const gltf = props.model;

  // animation
  const { animations, scene } = gltf;

  // Tạo AnimationMixer cho toàn bộ scene
  const mixer = useRef<THREE.AnimationMixer | null>(null);

  // set
  const { set } = useThree();

  // thời lượng của animation
  // Lấy thời lượng 1 animation khong phai camera
  const duration = animations[1].duration;
  props.setDuration(duration);

  // danh sách object có thể thay đổi thuộc tính
  const [objectList, setObjectList] = useState<
    THREE.Object3D<Object3DEventMap>[]
  >([]);

  // use effect cho lựa video
  /**
   * hiện tại là lặp qua toàn bộ object rồi lựa object cha để bỏ vào danh sách
   *
   */
  
  useEffect(() => {
    if (gltf) {
      // tạo 1 list temp
      const newObjectList: THREE.Object3D<Object3DEventMap>[] = [];

      // Loop qua nodes ( object ) trong file gltf & thêm vào list nếu file bắt đầu bằng object
      Object.keys(gltf.nodes)
        .filter((key) => key.startsWith("object"))
        .map((key) => {
          newObjectList.push(gltf.nodes[key]);
        });

      // Update the state with the new list
      setObjectList((prevList) => [...prevList, ...newObjectList]);
    }
  }, [gltf]);

  // use effect cho animation
  /**
   * đoạn code sẽ chạy animation của scene
   *
   * (update: sẽ chạy animation của toàn bộ scene thay vì animation của từng object)
   *
   */

  useEffect(() => {
    if (gltf.cameras.length > 0) {
      const gltfCamera = gltf.cameras[0] as THREE.PerspectiveCamera; // Ép kiểu theo Threejs
      set({ camera: gltfCamera }); // Gán camera từ GLTF vào scene hiện tại
    }

    if (animations.length > 0) {
      if (!mixer.current) {
        mixer.current = new THREE.AnimationMixer(scene);
      }

      animations.forEach((clip) => {
        const action = mixer.current?.clipAction(clip);
        if (action) {
          action.reset().fadeIn(0.5).play();
        }
      });
    }
  }, [gltf, set]); // use effect sẽ chạy nếu có sự thay đổi gltf hoặc set

  /**
   * ----------------------------------------------------------------------------------------------------------------|
   * ----------------------------------------------------------------------------------------------------------------|
   * ------- FUNCTION ZONE-------------- FUNCTION ZONE-------------- FUNCTION ZONE-------------- FUNCTION ZONE-------|
   * ----------------------------------------------------------------------------------------------------------------|
   * ----------------------------------------------------------------------------------------------------------------|
   *
   */

  const timeRef = useRef(0); // Dùng useRef để lưu giá trị thực tế

  // nếu isplay là false thi gan gia tri time cho timeline
  useEffect(() => {
    if (mixer.current && !props.isPlay) {
      props.setTime(mixer.current.time); // Cập nhật thời gian khi có thay đổi thực sự
    }
  }, [props.isPlay]);

  // update timeline khi kéo vid
  useEffect(() => {
    if (mixer.current && !props.isPlay) {
      mixer.current.setTime(props.time); // Cập nhật thời gian khi có thay đổi thực sự
    }
  }, [props.time]);

  // Chạy animation mỗi frame
  useFrame((_state, delta) => {
    if (mixer.current && props.isPlay) {
      mixer.current.update(delta);
      timeRef.current = mixer.current.time;

      // Chỉ update state mỗi 60fps để tránh render liên tục
      if (Math.abs(props.time - timeRef.current) > 0.06) {
        props.setTime(timeRef.current);
      }

      if (mixer.current.time >= duration) {
        mixer.current.setTime(0);
      }
    }
  });
  // useFrame((state) => {
  //   if (props.isExporting) {
  //     props.capturer.capture(state.gl.domElement);
  //   }
  // })
  return (
    <>
      {/* ánh sáng */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 10, -5]}
        intensity={10}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* load model từ danh sách những model có thể thay đổi */}
      {objectList.map((obj, index) => (
        <primitive key={index} object={obj} />
      ))}

      {/* dùng chuột để điều khiển góc nhìn. sau này sẽ xoá đi hoặc sử dụng debug only*/}
      {props.isOrbitControl ? <OrbitControls /> : null}
    </>
  );
}
