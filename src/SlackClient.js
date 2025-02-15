import { w3cwebsocket as W3CWebSocket } from "websocket";

export default class SlackClient {
  constructor(openCB, msgCB, errorCB) {
    if (arguments.length !== 3) {
      throw new Error(
        `SlackClient: Invalid argument count. Expected 3 received ${arguments.length}`
      );
    }
    this.openCB = openCB;
    this.msgCB = msgCB;
    this.errorCB = errorCB;
    this.client = null;
    this.ready = false;
    this.error = false;
    this.init();
  }

  init = () => {
    if (!this.client)
      return this._connect(this.openCB, this.msgCB, this.errorCB);
  };

  _connect = (openCB, msgCB, errorCB) => {
    console.log("Connecting...");
    setTimeout(() => {
      this.client = new W3CWebSocket("ws://127.0.0.1:8080");
      this.client.onopen = () => this._onOpen(openCB);
      this.client.onmessage = (msg) => this._onMessage(msg, msgCB);
      this.client.onerror = () => this._onError(errorCB);
    }, 5000);
  };

  _onOpen = (callback) => {
    console.log("Client Connected");
    this.ready = true;
    this.error = false;
    this.getChannels();
    callback && callback(this);
  };

  _onError = (callback) => {
    console.log("Client Error:", callback);
    this.error = true;
    callback && callback();
  };

  _onMessage = (msg, callback = () => {}) => {
    console.log("Message Received: ", JSON.parse(msg.data));
    const data = JSON.parse(msg.data);
    callback(data);
  };

  _sendMessage = (message) => {
    console.log("Send Message: ", message);
    this.client.send(JSON.stringify(message));
  };

  isReady = () => this.ready;

  getChannels = (maxCount) => {
    this._sendMessage({ action: "GET_CHANNELS", value: maxCount });
  };

  getMessages = (channel, count) => {
    this._sendMessage({ action: "GET_MESSAGES", channel, count });
  };
}
