<template>
  <div class="chat">
    <mu-appbar title="Type Chat" class="appBar">
      <mu-icon-button icon="menu" slot="left" />
      <mu-icon-button icon="expand_more" slot="right" @click=showLogin />
    </mu-appbar>
    <mu-list class="msgList">
      <Message v-for="item in msgList" :key="item.id" v-bind="item"></Message>
    </mu-list>
    <mu-bottom-nav class="msgInput" :value="bottomNav">
      <mu-text-field v-model="msgInput" class="inputFiled" label="Input your message here" labelFloat />
      <mu-raised-button id="sendBtn" icon="send" @click="sendText"/>
    </mu-bottom-nav>
    <Login></Login>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState, mapMutations, mapGetters } from 'vuex';
import Login from '@/components/Login.vue';
import Message from '@/components/Message.vue';
import message from '../model/message';
import config from '../config';

@Component({
	components: {
		Login,
		Message,
	},
	computed: {
		...mapState(['ws', 'msgList', 'user']),
	},
	methods: {
		...mapMutations(['toggleLogin', 'initWS', 'addMsg', 'sendMsg']),
	},
})
export default class Chat extends Vue {
	public msgInput: string = '';
	public bottomNav: string = '';
	public showLogin(this: any) {
		this.toggleLogin(true);
	}
	public sendText(this: any) {
		if (this.msgInput === '') return false;
		const user = this.user;
		const content = this.msgInput;
		this.sendMsg({
			type: 'addMsg',
			from: user,
			content,
		});
		this.msgInput = '';
	}
	sendJoin(this: any) {
		const user = this.user;
		this.sendMsg({
			type: 'join',
			from: user,
			content: '',
		});
	}
	createSocket(this: any) {
		this.initWS(new WebSocket(config.wsurl));
		this.ws.onopen = (e: any) => {
			console.log('connection established');
			this.sendJoin();
		};
		this.ws.onmessage = (e: any) => {
			const msg = JSON.parse(e.data);
			this.$store.commit('addMsg', msg);
			this.$nextTick(() => {
				//scrollIntoView
				try {
					const msgEl = document.querySelector('.msgList > div:last-child');
					if (msgEl) msgEl.scrollIntoView();
				} catch (err) {
					console.error(err);
				}
			});
		};
		this.ws.onerror = (error: any) => {
			this.createSocket();
		};
	}
	created() {
		this.createSocket();
	}
	beforeDestroy(this: any) {
		this.ws.close();
	}
}
</script>

<style scoped>
.chat {
	width: 100%;
	height: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
}
.appBar {
	background: #42b983;
}
.msgList {
	height: 100%;
	margin: 0 auto 50px;
	overflow: auto;
}

.msgInput {
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	bottom: 0;
	width: 80%;
	left: 50%;
	transform: translate(-50%, -20%);
}

.inputFiled {
	width: 300px;
}

#sendBtn {
	width: 60px;
	margin-left: 0.5rem;
	background: #42b983;
	color: #fff;
}
</style>
