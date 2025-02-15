import React, { Fragment, Suspense, useRef, useContext, useState } from 'react';
import 'react-dat-gui/dist/index.css';
import { Canvas } from '@react-three/fiber';
import objectPath from 'object-path';

import Scene from 'Containers/Scene';
import ProgressWheel from 'Components/ProgressWheel';
import Overlay from 'Components/Overlay';

import { useContextBridge, OrbitControls } from '@react-three/drei';

import GUIContext from 'GUIContext';

export default function Home() {
  const ContextBridge = useContextBridge(GUIContext);

  const {
    data: {
      gui: { showGUI },
    },
  } = useContext(GUIContext);
  const { data, updateGUI } = useContext(GUIContext);

  const clicked = () => {
    objectPath.set(data, 'data.gui.showGUI', !showGUI);
    updateGUI(data);
  };

  return (
    <Fragment>
      <Canvas gl={{ alpha: false }} shadows dpr={[1, 1.5]}>
        <ContextBridge>
          <Suspense fallback={<ProgressWheel />}>
            <Scene />
          </Suspense>
        </ContextBridge>
      </Canvas>
      <Overlay onClick={clicked} />
    </Fragment>
  );
}
