import React, { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Loader } from '@react-three/drei';
import ProgressWheel from 'Components/ProgressWheel';
import '@fontsource/inter'; // Defaults to w1eight 400.

import './index.css';
import App from './App';

ReactDOM.render(
  <StrictMode>
    {/* <Suspense fallback={null}> */}
    <App />
    {/* </Suspense> */}
  </StrictMode>,
  document.getElementById('root')
);
