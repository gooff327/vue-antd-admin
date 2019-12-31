import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from "ant-design-vue";
import 'ant-design-vue/dist/antd.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './request'
import draggable from 'vuedraggable'

Vue.use(draggable);
Vue.use(Antd);
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
