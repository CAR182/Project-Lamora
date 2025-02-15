import React, { useContext } from 'react';
import { DatFolder, DatNumber, DatButton, DatSelect, DatColor } from 'react-dat-gui';
import 'react-dat-gui/dist/index.css';
import objectPath from 'object-path';
import GUIContext from 'GUIContext';

export default function MessageQueue(isClosed) {
  const { data, updateGUI } = useContext(GUIContext);
  const {
    data: {
      scene: {
        global: { channels },
      },
    },
  } = useContext(GUIContext);

  return (
    <DatFolder title='Messages' closed={isClosed}>
      <DatButton
        onClick={() => {
          objectPath.set(data, 'scene.messageQueue.addItem', () => {});
          return updateGUI(data);
        }}
        label='Add Message'
      />
      <DatSelect path='scene.global.channel' label='Channel' options={channels.map((chan) => chan.name)} />
      <DatNumber path='scene.messageQueue.maxItems' label='Max Items' min={0} max={10} step={1} />
      <DatNumber path='scene.messageQueue.itemOffset' label='Item Offset' min={0} max={10} step={0.1} />
      <DatNumber path='scene.messageQueue.baseOffset' label='Base Offset' min={0} max={10} step={0.1} />
      <DatNumber path='scene.global.channelBoxPos' label='ChannelBox Position' min={0} max={10} step={0.1} />
      <DatColor path='scene.messageQueue.channelBoxColour' label='Channel Box Colour' />
      <DatColor path='scene.messageQueue.messageBoxColour' label='Message Box Colour' />
      <DatFolder title='Origin' closed={true}>
        <DatNumber path='scene.messageQueue.origin.x' label='X Position' min={0} max={10} step={0.1} />
        <DatNumber path='scene.messageQueue.origin.y' label='Y Position' min={0} max={10} step={0.1} />
        <DatNumber path='scene.messageQueue.origin.z' label='Z Position' min={0} max={10} step={0.1} />
      </DatFolder>
      <DatFolder title='Target' closed={true}>
        <DatNumber path='scene.messageQueue.target.x' label='X Position' min={0} max={10} step={0.1} />
        <DatNumber path='scene.messageQueue.target.y' label='Y Position' min={0} max={10} step={0.1} />
        <DatNumber path='scene.messageQueue.target.z' label='Z Position' min={0} max={10} step={0.1} />
      </DatFolder>
      <DatFolder title='Scale' closed={true}>
        <DatNumber path='scene.messageQueue.scale.x' label='X Scale' min={0} max={1} step={0.01} />
        <DatNumber path='scene.messageQueue.scale.y' label='Y Scale' min={0} max={1} step={0.01} />
        <DatNumber path='scene.messageQueue.scale.z' label='Z Scale' min={0} max={1} step={0.01} />
      </DatFolder>
    </DatFolder>
  );
}
