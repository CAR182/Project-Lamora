import { createContext } from 'react';

export const defaults = {
  data: {
    gui: {
      showGUI: true,
      camControls: false,
      debugCamera: null,
      grid: false,
      camXPos: -2.8,
      camYPos: 1.55,
      camZPos: 6.5,
      camYRot: -0.3,
      targetX: -3,
      targetY: 1.7,
      targetZ: 2.5,
    },
    scene: {
      global: {
        channel: '',
        channels: [],
        channelBoxPos: 4.9,
        connecting: false,
        connected: false,
        error: false,
        environment: 'dawn',
        background: '#1C1746',
        floor: '#0A0909',
      },
      loader: {
        loadingColours: {
          outer: 'white',
          inner: '#00C4E1',
          segments: '#A9F5F5',
          center: '#B38BFF',
          centerRings: '#FF69D1',
        },
        successColours: {
          outer: '#00e7ac',
          inner: '#54fcde',
          segments: '#0fffcc',
          center: '#95f5cd',
          centerRings: '#0ffcff',
        },
        errorColours: {
          outer: '#ff007a',
          inner: '#ff4c8c',
          segments: '#f20069',
          center: '#ff3681',
          centerRings: '#ff02aa',
        },
      },
      messageQueue: {
        itemOffset: 1.3,
        baseOffset: 1.3,
        maxItems: 3,
        origin: { x: 0, y: 0, z: 1.25 },
        target: { x: 0, y: 4.7, z: 1.25 },
        scale: { x: 1, y: 1, z: 1 },
        addItem: null, //function
        messageBoxColour: '#36a8ff',
        channelBoxColour: '#6fcdff',
      },
    },
  },
};

export default createContext({});
