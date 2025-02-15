import React from 'react';
import { DatFolder, DatColor } from 'react-dat-gui';
import 'react-dat-gui/dist/index.css';

export default function Loader(isClosed) {
  return (
    <DatFolder title='Loader' closed={isClosed}>
      <DatFolder title='Loading' closed={isClosed}>
        <DatColor path='scene.loader.loadingColours.outer' label='Loader Outer Ring' />
        <DatColor path='scene.loader.loadingColours.inner' label='Loader Inner Ring' />
        <DatColor path='scene.loader.loadingColours.segments' label='Loader Segments' />
        <DatColor path='scene.loader.loadingColours.centerRings' label='Loader Center Rings' />
        <DatColor path='scene.loader.loadingColours.center' label='Loader Center' />
      </DatFolder>
      <DatFolder title='Success' closed={isClosed}>
        <DatColor path='scene.loader.successColours.outer' label='Loader Outer Ring' />
        <DatColor path='scene.loader.successColours.inner' label='Loader Inner Ring' />
        <DatColor path='scene.loader.successColours.segments' label='Loader Segments' />
        <DatColor path='scene.loader.successColours.centerRings' label='Loader Center Rings' />
        <DatColor path='scene.loader.successColours.center' label='Loader Center' />
      </DatFolder>
      <DatFolder title='Error' closed={isClosed}>
        <DatColor path='scene.loader.errorColours.outer' label='Loader Outer Ring' />
        <DatColor path='scene.loader.errorColours.inner' label='Loader Inner Ring' />
        <DatColor path='scene.loader.errorColours.segments' label='Loader Segments' />
        <DatColor path='scene.loader.errorColours.centerRings' label='Loader Center Rings' />
        <DatColor path='scene.loader.errorColours.center' label='Loader Center' />
      </DatFolder>
    </DatFolder>
  );
}
