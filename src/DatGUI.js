import React, { useContext } from 'react';
import DatGui, { DatFolder, DatBoolean, DatButton, DatNumber, DatColor } from 'react-dat-gui';
import objectPath from 'object-path';

import GUIContext from 'GUIContext';

import Loader from './GUI/Loader';
import MessageQueue from './GUI/MessageQueueGUI';

export default function DatGUI() {
  const { data, updateGUI, debugCam } = useContext(GUIContext);
  return (
    <DatGui data={data} onUpdate={(data) => updateGUI(data)} style={{ zIndex: 100, left: '15px' }}>
      <DatFolder title='Global' closed={true}>
        <DatBoolean path='gui.camControls' label='Orbital Controls' />
        <DatBoolean path='gui.grid' label='Grid' />
        <DatButton
          onClick={() => {
            objectPath.set(data, 'gui.debugCamera', () => {});
            return updateGUI(data);
          }}
          label='Debug Camera Info'
        />
        <DatNumber path='gui.camXPos' label='XPos' min={-25} max={20} step={0.01} />
        <DatNumber path='gui.camYPos' label='YPos' min={-25} max={20} step={0.01} />
        <DatNumber path='gui.camZPos' label='ZPos' min={-25} max={20} step={0.01} />

        <DatNumber path='gui.camYRot' label='Rotation Y' min={-25} max={20} step={0.001} />
        <DatNumber path='gui.targetX' label='TargetXPos' min={-25} max={20} step={0.1} />
        <DatNumber path='gui.targetY' label='TargetYPos' min={-25} max={20} step={0.1} />

        <DatNumber path='gui.targetZ' label='TargetZPos' min={-25} max={20} step={0.1} />
        <DatColor path='scene.global.background' label='Background Colour' />
        <DatColor path='scene.global.floor' label='Floor Colour' />
        {/* <DatColor path='scene.global.fog' label='Fog Colour' /> */}
      </DatFolder>
      {Loader(true)}
      {MessageQueue(true)}
    </DatGui>
  );
}
