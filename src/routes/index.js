import VueRouter from 'vue-router';

import Account from '@/views/Account.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';

const routes = [
  {
    component: Account,
    name: 'Account',
    path: '/account',
  },
  {
    component: Home,
    name: 'Home',
    path: '/',
  },
  {
    component: Login,
    name: 'Login',
    path: '/login',
  },
];

export default new VueRouter({
  linkActiveClass: 'active',
  mode: 'history',
  routes,
});
