import WebSocket from 'ws';

declare module 'Server' {
	interface Server {
		[props: string]: any;
		broadcast: Function;
	}
	interface WebSocket {
		Server: Server;
	}
}
