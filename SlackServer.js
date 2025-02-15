import pkg from '@slack/bolt';
const { App } = pkg;

class SlackServer {
  constructor(webSocket) {
    console.log('SlackServer');
    this.client = null;
    this.webSocket = webSocket;
    this.app = null;
    this.channels = [];
    this.activeChannel = '';
    this.init();
  }

  init = () => {
    console.log('Init SlackServer');
    if (!this.server) return this._connect(this.openCB, this.msgCB, this.errorCB);
  };

  setWebSocket = (socket) => (this.webSocket = socket);

  _connect = async () => {
    console.log('Connecting...');
    /* SLACK */
    this.app = new App({
      token: '[SLACK TOKEN]',
      appToken: '[SLACK_APP_TOKEN]',
      socketMode: true, // enable the following to use socket mode
    });

    // Start the app
    await this.app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running!');
    this.startMessageListener(); // WebSocket - Listen for incoming messages from Slack
  };

  startMessageListener = () => {
    this.app.message(async ({ message, say }) => {
      console.log('Message: ', message);
      try {
        const user = await this._getUserName(message.user);
        const channel = this._getChannelInfo(message.channel);
        if (this.activeChannel.id === channel.id) {
          if (this.webSocket) {
            this._sendToClient({
              action: 'MESSAGE',
              message: message.text,
              user,
              channel: channel.name,
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    });
  };

  getChannels = async (maxCount = 10) => {
    console.log('getChannels: ', maxCount);
    try {
      const result = await this.app.client.conversations.list({
        limit: maxCount,
      });
      const channels = result.channels.map((channel) => ({
        id: channel.id,
        name: channel.name,
      }));
      this.channels = channels;
      this._sendToClient({ action: 'CHANNEL_LIST', channels });
      return result;
    } catch (error) {
      console.log('Error:', error);
    }
  };

  getMessages = async (channel, msgCount) => {
    console.log('getMessages: ', channel, msgCount);
    try {
      const chan = this._getChannelInfo(channel);
      this.activeChannel = chan;

      const result = await this.app.client.conversations.history({
        channel: chan.id,
        limit: msgCount,
      });

      for (const message of result.messages) {
        message.user = await this._getUserName(message.user);
        message.channel = channel;
      }

      this._sendToClient({
        action: 'MESSAGE_LIST',
        value: result.messages.reverse(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  getChannelList = () => this.channels;

  _getUserName = async (userId) => {
    const result = await this.app.client.users.info({
      user: userId,
    });
    return result.user.name;
  };

  _sendToClient = (messageObj) => {
    console.log('Send Message to Client');
    this.webSocket.send(JSON.stringify(messageObj));
  };

  _getChannelInfo = (value) => {
    console.log('_getChannelInfo: ', value, this.channels);
    const channel = this.channels.filter((channel) => channel.id === value || channel.name === value);
    if (!channel.length) throw new Error('Channel Not Found');
    return channel[0];
  };
}

export default new SlackServer();
