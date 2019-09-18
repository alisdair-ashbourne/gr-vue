<script>
import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';
import VueRouter from 'vue-router';

const routes = [
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
</script>