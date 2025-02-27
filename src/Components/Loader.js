/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useContext, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import objectPath from 'object-path';
import GUIContext from 'GUIContext';
import * as THREE from 'three';

import { useSpring, animated, config } from '@react-spring/three';

export default function Model(props) {
  const group = useRef();
  const centerRef = useRef();
  const { nodes, materials } = useGLTF('/Loader.glb');

  const { data } = useContext(GUIContext);
  let { connected, connecting, error } = objectPath.get(data, 'scene.global');
  let { loadingColours, errorColours, successColours } = objectPath.get(data, 'scene.loader');

  const [activePalette, setPalette] = useState('loading');
  const [colorPalette, setColours] = useState({
    loading: objectPath.get(data, 'scene.loader.loadingColours'),
    success: objectPath.get(data, 'scene.loader.successColours'),
    error: objectPath.get(data, 'scene.loader.erroColoursr'),
  });

  /* Set active palette to success or error */
  const setStatusColours = () => {
    if (connected) {
      setPalette('success');
    }
    if (error) {
      setPalette('error');
    }
  };

  /* Change colours in palette */
  useEffect(() => {
    setColours({
      ...colorPalette,
      loading: loadingColours,
      success: successColours,
      error: errorColours,
    });
  }, [loadingColours, successColours, errorColours]);

  useEffect(() => {
    if (connecting) {
      setPalette('loading');
    }

    if (connected || error) {
      setStatusColours();
    }
  }, [connecting, connected, error]);

  useEffect(() => {
    OuterRing.start({ config: { duration: 5000 } });
    InnerRing.start({ config: { duration: 5000 } });
    Segments.start({ config: { duration: 5000 } });
    CenterRingIn.start({ config: { duration: 5000 } });
    CenterRingOut.start({ config: { duration: 5000 } });
  }, []);

  const { OuterRing, InnerRing, Segments, Center, CenterRingIn, CenterRingOut } = useSpring({
    loop: true,
    from: {
      OuterRing: [0, 0, 0],
      InnerRing: [0, 0, 0],
      Segments: [0, 0, 0],
      Center: [0, 0, 0],
      CenterRingIn: [0, 0, 0],
      CenterRingOut: [0, 0, 0],
    },
    to: {
      OuterRing: [0, 0, THREE.Math.degToRad(360)],
      InnerRing: [0, 0, -THREE.Math.degToRad(360)],
      Segments: [0, 0, THREE.Math.degToRad(360)],
      Center: [-THREE.Math.degToRad(360), 0, 0],
      CenterRingIn: [THREE.Math.degToRad(360), 0, 0],
      CenterRingOut: [0, -THREE.Math.degToRad(360), 0],
    },
  });

  const { scale } = useSpring({
    delay: 500,
    from: { scale: connected ? [1, 1, 1] : [0, 0, 0] },
    to: { scale: connected ? [0, 0, 0] : [1, 1, 1] },
    config: config.wobbly,
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <animated.mesh scale={scale} rotation={OuterRing}>
        <mesh castShadow receiveShadow geometry={nodes.Outer.geometry} material={materials.BlueGlass}>
          <meshBasicMaterial color={colorPalette[activePalette].outer} toneMapped={false} />
        </mesh>
      </animated.mesh>
      <animated.mesh scale={scale} rotation={InnerRing}>
        <mesh castShadow receiveShadow geometry={nodes.Inner.geometry} material={nodes.Inner.material}>
          <meshBasicMaterial color={colorPalette[activePalette].inner} toneMapped={false} />
        </mesh>
      </animated.mesh>
      <animated.mesh scale={scale} rotation={Segments}>
        <mesh castShadow receiveShadow geometry={nodes.Segments.geometry} material={nodes.Segments.material}>
          <meshBasicMaterial color={colorPalette[activePalette].segments} toneMapped={false} />
        </mesh>
      </animated.mesh>
      <animated.mesh ref={centerRef} scale={scale} rotation={Center}>
        <mesh castShadow receiveShadow geometry={nodes.Center.geometry} material={nodes.Center.material}>
          <meshBasicMaterial transparent={true} color={colorPalette[activePalette].center} />
        </mesh>
      </animated.mesh>
      <animated.mesh scale={scale} rotation={CenterRingIn}>
        <mesh castShadow receiveShadow geometry={nodes.RingOut.geometry} material={nodes.RingOut.material}>
          <meshBasicMaterial color={colorPalette[activePalette].centerRings} toneMapped={false} />
        </mesh>
      </animated.mesh>
      <animated.mesh scale={scale} rotation={CenterRingOut}>
        <mesh castShadow receiveShadow geometry={nodes.RingIn.geometry} material={nodes.RingIn.material}>
          <meshBasicMaterial color={colorPalette[activePalette].centerRings} toneMapped={false} />
        </mesh>
      </animated.mesh>
    </group>
  );
}

useGLTF.preload('/Loader.glb');
