import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';
import Chat from '@/components/Chat.vue';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home,
		},
		{
			path: '/chat',
			name: 'Chat',
			component: Chat,
		}
	],
});
