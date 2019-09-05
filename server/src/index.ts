import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import config from './config/'
import message from './model/message';
const app = express();

app.use(express.static('public'));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Broadcast to all.
const broadcast = (data: message) => {
	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(data);
		}
	});
};
//建立websocket server 而非websocket服务
wss.on('connection', (ws) => {
	console.log('connection established');
	ws.on('message', (data: message) => {
		broadcast(data);
	});

	ws.on('error', (error) => {
		console.log(error);
	});

	wss.on('close', (_) => {
		console.log(_);
		console.log('closed');
	});
});

wss.on('error', (err) => {
	console.log('error');
	console.log(err);
});

server.listen(config.port, function listening() {
	console.log('Listening on %d', server.address().port);
});
