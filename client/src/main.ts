import Vue from 'vue';
import App from './App.vue';
import router from './router/';
import store from './store/';

Vue.config.productionTip = false;

export default new Vue({
	el: '#app',
	router,
	store,
	render: (h) => h(App),
});
