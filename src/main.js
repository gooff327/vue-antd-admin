import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from "ant-design-vue";
import 'ant-design-vue/dist/antd.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './request'
import Draggable from 'vuedraggable'
import {VueMasonryPlugin} from "vue-masonry";
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(Antd);
Vue.use(mavonEditor);
Vue.use(VueMasonryPlugin);
Vue.component('VueDraggable', Draggable);
Vue.prototype.$nprogress = NProgress;

router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
});

router.afterEach(() => {
  NProgress.done();
});

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
