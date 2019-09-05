import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';
import message from './message';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		...user.state,
		...message.state,
	},
	mutations: {
		...user.mutations,
		...message.mutations,
	},
	actions: {
		...user.actions,
	},
});

export default store;
