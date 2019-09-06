import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
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
			path: '/chatHome',
			name: 'ChatHome',
			component: ChatHome,
		},
	],
});
