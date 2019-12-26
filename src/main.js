import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from "ant-design-vue";
import 'ant-design-vue/dist/antd.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './request'

Vue.use(Antd);
Vue.prototype.$nprogress = NProgress;

router.beforeEach((to, from, next) => {
  console.log('router_beforeEach_hook', to, from);
  NProgress.start();
  next()
});

router.afterEach((to, from) => {
  console.log('router_afterEach_hook', to, from);
  NProgress.done();
});

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
