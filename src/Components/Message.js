import React, { Fragment, useContext } from 'react';

import { Html } from '@react-three/drei';
import Typography from '@mui/material/Typography';
import GUIContext from 'GUIContext';

import MessageBox from './MessageBox';
import styles from './Message.module.css';

export default function Message({ user, text, channel, scale }) {
  return (
    <Fragment>
      <MessageBox colour='skyblue' scale={scale} />
      <Html className={styles.content} transform>
        <div className={styles.messageContainer}>
          <div className={styles.infoContainer}>
            <img className={styles.icon} src='\static\slack_logo.svg' />
            <div className={styles.infoText}>
              <Typography className={styles.info}>
                <Typography className={styles.prefix}> Channel :</Typography>
                {channel}
              </Typography>
              <Typography className={styles.info}>
                <Typography className={styles.prefix}>Username :</Typography>
                {user}
              </Typography>
            </div>
          </div>
          <Typography className={styles.message}>
            <Typography className={styles.prefix}>Message :</Typography>
            {text}
          </Typography>
        </div>
      </Html>
    </Fragment>
  );
}
