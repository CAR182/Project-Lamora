import React, { Fragment, useRef, useContext, useEffect, useState } from 'react';
import objectPath from 'object-path';
import GUIContext from 'GUIContext';
import { Html } from '@react-three/drei';
import anime from 'animejs';
import { useSpring, config } from '@react-spring/three';

import ChannelBox from './ChannelBox';
import styles from './Message.module.css';

export default function ChannelScroll(props) {
  const titleRef = useRef();
  const { data } = useContext(GUIContext);
  const [chan, setChannel] = useState('');
  let { connected, channel, channelBoxPos } = objectPath.get(data, 'scene.global');

  useEffect(() => {
    if (channel) {
      animate('OUT', channel);
    }
  }, [channel]);

  useEffect(() => {}, []);

  const reset = (channel) => {
    setChannel(channel);
    animate('IN');
  };

  const animate = (state, channel) => {
    anime({
      targets: titleRef.current,
      translateY: state === 'IN' ? [10, 0] : [0, -10],
      opacity: state === 'IN' ? [0, 1] : [1, 0],
      easing: state === 'IN' ? 'easeOutExpo' : 'easeInExpo',
      duration: 800,
      complete: () => (state === 'OUT' ? reset(channel) : () => {}),
    });
  };

  const { scale } = useSpring({
    delay: 500,
    scale: connected ? [1, 1, 1] : [0, 0, 0],
    config: config.wobbly,
  });

  return (
    <Fragment>
      <ChannelBox {...props} positionY={channelBoxPos} scale={scale} />
      <Html {...props} position-y={channelBoxPos} transform>
        <div className={styles.channelBox}>
          <div ref={titleRef} className={styles.channelContent}>
            {chan}
          </div>
        </div>
      </Html>
    </Fragment>
  );
}
