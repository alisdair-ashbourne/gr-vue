import VueRouter from 'vue-router';

import Account from '@/views/Account.vue';
import Chart from '@/views/Chart.vue';
import Goal from '@/views/Goal.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Party from '@/views/Party.vue';
import SignUp from '@/views/SignUp.vue';

const routes = [
  {
    component: Account,
    name: 'Account',
    path: '/account',
  },
  {
    component: Chart,
    name: 'Chart',
    path: '/chart',
  },
  {
    component: Goal,
    name: 'Goals',
    path: '/goals',
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
  {
    component: Party,
    name: 'Party',
    path: '/party',
  },
  {
    component: SignUp,
    name: 'Sign Up',
    path: '/sign-up',
  },
];

export default new VueRouter({
  linkActiveClass: 'active',
  mode: 'history',
  routes,
});
