<template>
  <div class="login">
    <mu-popup position="right" popupClass="popup" :open="loginVisible" @close="close">
      <mu-text-field v-model="username" class="nameFiled" label="Input your name here" labelFloat required/>
      <mu-raised-button class="chatBtn" icon="send" @click="startChat" label="Chat Now !" />
    </mu-popup>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState, mapMutations } from 'vuex';
import User from '../model/user';
import * as utils from '../utils/';
import config from '../config';

const names = [
	'谢广坤',
	'刘能',
	'王长贵',
	'谢永强',
	'王小蒙',
	'宋富贵',
	'谢大脚',
	'方正',
	'赵四',
	'刘英',
	'权志龙',
];

@Component({
	computed: {
		...mapState(['loginVisible']),
	},
	methods: {
		...mapMutations([
			'updateUsername',
			'toggleLogin',
			'initUserInfo',
			'sendMsg',
		]),
	},
})
export default class Login extends Vue {
	private username: string = '';
	startChat(this: any) {
		if (this.username) {
			this.updateUsername(this.username);
			this.toggleLogin(false);
		}
	}
	close(this: any) {
		this.toggleLogin(false);
	}
	getUserInfo(this: any) {
		let user;
		let userInfo = localStorage.getItem('user');
		if (userInfo) {
			user = JSON.parse(userInfo);
		} else {
			const uuid = utils.uuid();
			user = new User(uuid, this.getRandomName(), config.avatarApi + uuid);
		}
		this.initUserInfo(user);
		this.username = user.name;
	}
	getRandomName() {
		function getRandomInt(min: number, max: number) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
		}
		return names[getRandomInt(0, 10)];
	}
	created() {
		this.getUserInfo();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.popup {
	width: 80%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.nameFiled {
	padding: 0.5rem;
}

.chatBtn {
	width: 80%;
	margin: 0.8rem auto;
	background: #42b983;
	color: #fff;
}
</style>
