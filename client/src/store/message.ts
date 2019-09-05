import message from '../model/message';

export default {
	state: {
		msgList: [],
		ws: WebSocket,
	},
	mutations: {
		toggleLogin(state: any, visible: boolean) {
			state.loginVisible = visible;
		},
		addMsg(state: any, msg: message) {
			state.msgList.push(msg);
		},
		initWS(state: any, ws: WebSocket) {
			state.ws = ws;
		},
		sendMsg(state: any, msg: message) {
			state.ws.send(JSON.stringify(msg));
		},
	},
};
