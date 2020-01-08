import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
Vue.use(VueRouter)

export const staticRoutes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/dashboard',
    component: Home,
    children: [],
    meta: {
      icon: 'home'
    }
  },
  {
    path: '/error',
    name: '404',
    component: () => import('@/views/NotFound')
  }
];

const createRouter = (routes) => new VueRouter({
  // mode: 'history',
  scrollBehavior: (to, from, savedPosition) => { // only available in HTML5 history mode
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: routes
});

store.dispatch("initMenus")
staticRoutes[0].children = store.getters.menus;
const router = createRouter(staticRoutes);
export default router

export function resetRouter() {
  store.dispatch("initMenus")
  staticRoutes[0].children = store.getters.menus;
  const newRouter = createRouter(staticRoutes);
  router.matcher = newRouter.matcher
}
