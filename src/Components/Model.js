import React, { useRef, useState, useContext, useEffect } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import objectPath from 'object-path';
import anime from 'animejs';
import GUIContext from 'GUIContext';

export default function Model(props) {
  let base = new THREE.Color('white');
  const group = useRef();
  const animationRef = useRef();
  const bulbRef = useRef();
  const { nodes, materials } = useGLTF('/SlackHologram.glb');
  const { data, updateGUI } = useContext(GUIContext);
  let { connected, connecting, error } = objectPath.get(data, 'scene.global');

  const [btnHover, setHover] = useState('');

  let animValues = {
    alpha: 0.0,
    primaryColour: new THREE.Color('white'),
    secondaryColour: new THREE.Color('blue'),
    successColour: new THREE.Color('green'),
    errorColour: new THREE.Color('red'),
  };

  const scrollChannel = (value) => {
    if (connected) {
      const channels = objectPath.get(data, 'scene.global.channels');
      const currentChannel = objectPath.get(data, 'scene.global.channel');
      const currentIndex = channels.findIndex((entry) => entry.name === currentChannel);

      let selected = null;
      if (Math.sign(value) > 0) {
        // UP
        selected =
          currentIndex + 1 < channels.length ? (selected = channels[currentIndex + 1]) : (selected = channels[0]);
      } else {
        // DOWN
        selected = currentIndex - 1 > 0 ? channels[currentIndex - 1] : channels[channels.length - 1];
      }
      if (selected) {
        objectPath.set(data, 'scene.global.channel', selected.name);
        updateGUI(data);
      }
    }
  };

  useEffect(() => {
    if (connecting) animate();

    if (connected || error) {
      animationRef.current.pause();
      animationRef.current.remove(animValues);

      bulbRef.current.color = connected ? animValues.successColour : animValues.errorColour;
    }
  }, [connecting, connected, error]);

  const animate = () => {
    animationRef.current = anime({
      loop: true,
      direction: 'alternate',
      targets: animValues,
      alpha: 1.0,
      duration: 1000,
      easing: 'easeInOutSine',
      update: () => {
        bulbRef.current.color = base.lerpColors(animValues.primaryColour, animValues.secondaryColour, animValues.alpha);
      },
    });
  };

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        onPointerOver={() => setHover('DOWN')}
        onPointerOut={() => setHover('')}
        onClick={() => scrollChannel(-1)}
        castShadow
        receiveShadow
        geometry={nodes.ArrowDown.geometry}
        material={nodes.ArrowDown.material}>
        <meshStandardMaterial color={btnHover === 'DOWN' ? '#ffa500' : 'white'} />
      </mesh>
      <mesh
        onPointerOver={() => setHover('UP')}
        onPointerOut={() => setHover('')}
        onClick={() => scrollChannel(1)}
        castShadow
        receiveShadow
        geometry={nodes.ArrowUp.geometry}
        material={nodes.ArrowUp.material}>
        <meshStandardMaterial color={btnHover === 'UP' ? '#ffa500' : 'white'} />
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes['Base-Section'].geometry} material={materials.Metal} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Base-Section_1'].geometry}
        material={nodes['Base-Section_1'].material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Base-Section_2'].geometry}
        material={materials['Blue Emission']}
      />
      <mesh castShadow receiveShadow geometry={nodes['Base-Section_3'].geometry} material={materials.Screw} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Base-Section_4'].geometry}
        material={materials['Metallic-Rough']}
      />
      <mesh castShadow receiveShadow geometry={nodes['Base-Section_5'].geometry} material={materials.Wire} />
      <mesh castShadow receiveShadow geometry={nodes['Base-Section_6'].geometry} material={materials.BlackMatt} />
      <mesh
        position={[0, 0, 0.001]}
        castShadow
        receiveShadow
        geometry={nodes.bulb_1.geometry}
        material={materials.Bulb}>
        <meshBasicMaterial ref={bulbRef} toneMapped={false} />
      </mesh>
      <mesh
        position={[0, 0, -0.03]}
        castShadow
        receiveShadow
        geometry={nodes.bulb_2.geometry}
        material={materials['Metal.002']}
      />
    </group>
  );
}

useGLTF.preload('/SlackHologram.glb');
