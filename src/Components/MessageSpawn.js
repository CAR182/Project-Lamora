import React, { useState, useContext, useEffect, useRef, Fragment } from 'react';
import objectPath from 'object-path';
import { useTransition, animated, config } from '@react-spring/three';
import shortid from 'shortid';
import SlackClient from '../SlackClient';
import GUIContext from 'GUIContext';
import Message from './Message';

export default function MessageSpawn(props) {
  const {
    data: {
      scene: {
        global: { channel },
        messageQueue: { origin, target, baseOffset, itemOffset, addItem, maxItems },
      },
    },
  } = useContext(GUIContext);
  const { data, updateGUI } = useContext(GUIContext);

  const [list, setList] = useState([]);
  const [client, setClient] = useState(null);
  const listRef = useRef(list); // Make a ref and give it the count

  let STARTING_POS = origin;
  let TARGET_POS = target;

  const newItem = (user, message, channel, type = 'MESSAGE') => ({
    id: shortid.generate(),
    user,
    message,
    channel,
    type,
  });

  const prependItem = (item) => [item, ...listRef.current]; //prepend
  const replaceItems = (item) => [item];

  // Keeps the state and ref equal as "onmessage" is a nested reference
  const updateState = (newValues) => {
    listRef.current = newValues;
    setList(newValues);
  };

  const onOpen = (client) => {
    objectPath.set(data, 'scene.global.connected', true);
    objectPath.set(data, 'scene.global.connecting', false);
    updateGUI(data);
    setClient(client);
  };

  const onMessage = (msg) => {
    switch (msg.action) {
      case 'CHANNEL_LIST':
        objectPath.set(data, 'scene.global.channels', msg.channels);
        objectPath.set(data, 'scene.global.channel', msg.channels[0].name);
        updateGUI(data);
        break;
      case 'MESSAGE':
        const { user, message } = msg;
        const newValues = prependItem(newItem(user, message, msg.channel));
        updateState(newValues);
        break;
      case 'MESSAGE_LIST':
        var interval = 1000; // how much time should the delay between two iterations be (in milliseconds)?
        var promise = Promise.resolve();
        msg.value.forEach((message) => {
          promise = promise.then(function () {
            const newValues = prependItem(newItem(message.user, message.text, message.channel));
            updateState(newValues);
            return new Promise(function (resolve) {
              setTimeout(resolve, interval);
            });
          });
        });
        break;
      default:
        console.log(`Unknown Message Action: (${msg.action})`);
        break;
    }
  };

  const onError = () => {
    objectPath.set(data, 'scene.global.error', true);
    objectPath.set(data, 'scene.global.connecting', false);
    updateGUI(data);
  };

  /* Initiate the Slack Client and handle callback states */
  useEffect(() => {
    console.log('Initiate SlackClient');
    objectPath.set(data, 'scene.global.connecting', true);

    updateGUI(data);
    new SlackClient(
      (client) => onOpen(client),
      (data) => onMessage(data),
      () => onError()
    );
  }, []);

  /* Debug -Listen for changes made to the channel and call client function*/
  useEffect(() => {
    if (client) {
      client.getMessages(channel, maxItems);
    }
  }, [channel]);

  /* Debug - Add Message from GUI*/
  useEffect(() => {
    if (addItem) {
      const values = prependItem(newItem('react-user', 'In App Test', 'none'));
      updateState(values);
    }
  }, [addItem]);

  /* Handle maximum message count by checking the list length and reducing */
  useEffect(() => {
    if (list.length > maxItems) {
      listRef.current = list.slice(0, -1);
      setList(list.slice(0, -1));
    }
  });

  const listTransitions = useTransition(
    list.map((item, index) => {
      item.index = index;
      item.position = [
        STARTING_POS.x,
        STARTING_POS.y + baseOffset + index * itemOffset, // Increment
        STARTING_POS.z,
      ];
      return { ...item };
    }),

    {
      config: config.molasses,
      initial: {
        opacity: 0,
        scale: 0,
        position: Object.values(STARTING_POS),
      },
      from: {
        opacity: 0,
        scale: 0,
        position: Object.values(STARTING_POS),
      },
      enter: (item) => [{ opacity: 1, scale: 1, position: item.position }],
      leave: { opacity: 0, scale: 0, position: Object.values(TARGET_POS) },
      update: (item) => [{ position: item.position }],
      keys: (item) => item.id,
      expires: true,
    }
  );

  return (
    <Fragment>
      {listTransitions(({ position, scale }, item) => {
        return (
          <animated.mesh position={position} scale={scale}>
            <Message
              id={item.id}
              user={item.user}
              text={item.message}
              channel={item.channel}
              type={item.type}
              {...props}
            />
          </animated.mesh>
        );
      })}
    </Fragment>
  );
}
