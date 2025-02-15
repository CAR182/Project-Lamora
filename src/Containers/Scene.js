import React, { Fragment, useContext } from 'react';
import { OrbitControls, PerspectiveCamera, MeshReflectorMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';
import Model from 'Components/Model';
import GUIContext from 'GUIContext';
import MessageSpawn from 'Components/MessageSpawn';
import ChannelScroll from 'Components/ChannelScroll';
import Loader from 'Components/Loader';
// import { EffectComposer, Bloom, Outline } from '@react-three/postprocessing';

export default function Scene() {
  const {
    data: {
      gui: { grid, camControls, camXPos, camYPos, camZPos, camYRot, targetX, targetY, targetZ },
      scene: {
        global: { channelBoxPos, background, floor },
      },
    },
  } = useContext(GUIContext);

  return (
    <Fragment>
      <fog attach='fog' args={['#1D1746', 5, 10]} />
      <color attach='background' args={[background]} />
      <Environment preset='dawn' />
      <PerspectiveCamera makeDefault fov={65} position={[camXPos, camYPos, camZPos]} />
      <group position={[0, -0.5, 0]} rotation={[0, camYRot, 0]}>
        {grid && <gridHelper args={[50, 50]} />}
        {camControls && <OrbitControls makeDefault target={new THREE.Vector3(targetX, targetY, targetZ)} />}
        <ChannelScroll position={[0, 1, 1.25]} yPos={channelBoxPos} />
        <Loader position={[0, 1, 1.25]} />
        <MessageSpawn scale={[2, 1.25, 1]} />
        <Model />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
          <planeGeometry args={[32, 32]} />
          <meshBasicMaterial color={'#100C32'} toneMapped={false} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[8, 8]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={1024}
            mixBlur={0.2}
            mixStrength={100}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color={floor}
            metalness={0.5}
          />
        </mesh>
      </group>
      {/* <EffectComposer>
        <Bloom kernelSize={1} luminanceThreshold={0} luminanceSmoothing={0} intensity={0.5} />
      </EffectComposer> */}
    </Fragment>
  );
}
