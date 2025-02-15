import { WebSocketServer } from 'ws';
import SlackServer from './SlackServer.js';

/* WebSocket Server that connects to the SlackServer. The client connects here and it acts as a middleman to the Slack socket*/
const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', async function connection(ws, request, client) {
  var id = request.headers['sec-websocket-key'];
  console.log('Connected: ', id);
  SlackServer.setWebSocket(ws);

  ws.on('open', function open(request) {
    console.log(`On Open`);
  });

  ws.on('message', function message(request) {
    console.log(`On Message: ${request}`);
    const data = JSON.parse(request);
    if (data.action) {
      switch (data.action) {
        case 'GET_CHANNELS':
          SlackServer.getChannels();
          break;
        case 'SET_CHANNEL':
          break;
        case 'GET_MESSAGES':
          SlackServer.getMessages(data.channel, data.count);
          break;
        default:
          console.log('No Action Defined');
          break;
      }
    }
  });

  ws.on('close', function (info) {
    console.log('Disconnected', info);
  });
});
