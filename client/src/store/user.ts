import User from '../model/user';

export default {
	state: {
		loginVisible: false,
		user: {},
	},
	mutations: {
		toggleLogin(state: any, visible: boolean) {
			state.loginVisible = visible;
		},
		updateUsername(this: any, state: any, username: string) {
			state.user.oldname = state.user.name;
			state.user.name = username;
			localStorage.setItem('user', JSON.stringify(state.user));
			const user = state.user;
			this.commit('sendMsg', {
				type: 'rename',
				from: user,
				content: '',
			});
		},
		initUserInfo(state: any, user: User) {
			state.user = user;
			localStorage.setItem('user', JSON.stringify(user));
		},
		userLogin(this: any, state: any, username: string) {
			state.user.name = username;
			localStorage.setItem('user', JSON.stringify(state.user));
		}
	},
	actions: {},
};
