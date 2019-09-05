import Vue from 'vue';
import App from './App.vue';
import router from './router/';
import store from './store/';

import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import 'material-design-icons/iconfont/material-icons.css';
Vue.use(MuseUI);

Vue.config.productionTip = false;

export default new Vue({
	el: '#app',
	router,
	store,
	render: (h) => h(App),
});
