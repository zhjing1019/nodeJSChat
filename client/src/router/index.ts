import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Chat from '@/components/Chat.vue';
import ChatHome from '@/views/ChatHome.vue';

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
		},
		{
			path: '/chatHome',
			name: 'ChatHome',
			component: ChatHome,
		},
	],
});
