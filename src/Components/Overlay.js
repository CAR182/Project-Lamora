import React from 'react';

export default function Overlay() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '50%',
        height: '100%',
      }}>
      <svg viewBox='0 0 600 320' xmlns='http://www.w3.org/2000/svg'>
        <text fill='#E8B059' style={{ whiteSpace: 'pre' }} fontFamily='BigerOver' fontSize={40} letterSpacing='0em'>
          <tspan x={40} y={235} children={'Project Lamora'} />
        </text>
        <text fill='#E8B059' fontFamily='BigerOver' fontSize={20} letterSpacing='0em'>
          <tspan x={40} y={275} children={'#1'} />
        </text>
        <image href='slack_text_logo.svg' transform='translate(70,228)' height='80px' width='80px' />
      </svg>
    </div>
  );
}
