<template>
  <md-app md-mode="reveal">
    <md-app-toolbar class="md-secondary">
      <md-button class="md-icon-button" @click="isOpen = !isOpen">
        <md-icon>menu</md-icon>
      </md-button>

      <md-button class="md-title">Slayers</md-button>
    </md-app-toolbar>

    <md-app-drawer :md-active.sync="isOpen">
      <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

      <md-list>
        <router-link to="/">
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Home</span>
          </md-list-item>
        </router-link>

        <router-link to="/" v-if="isLoggedIn">
          <md-list-item @click="handleLogout">
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Logout</span>
          </md-list-item>
        </router-link>

        <router-link to="/login" v-else>
          <md-list-item>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Login</span>
          </md-list-item>
        </router-link>

        <router-link to="/account" v-if="isLoggedIn">
          <md-list-item>
            <md-icon>account_circle</md-icon>
            <span class="md-list-item-text">Account</span>
          </md-list-item>
        </router-link>
      </md-list>
    </md-app-drawer>

    <md-app-content>
      <router-view></router-view>
    </md-app-content>
  </md-app>
</template>

<script>
import { mapState } from 'vuex';

import LoginApi from '@/services/login.js';

import Account from '@/views/Account.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';

export default {
  components: {
    Account,
    Home,
    Login,
  },
  computed: {
    ...mapState('authentication', ['isLoggedIn']),
  },
  created() {
    this.$store.dispatch('authentication/checkLoginStatus');
  },
  data: () => ({
    isOpen: false,
  }),
  methods: {
    handleLogout() {
      LoginApi.logout().then(() => {
        this.$store.commit('authentication/updateIsLoggedIn', false);
        this.$store.commit('user/updateUser', null);
        this.isOpen = false;
      });
    },
  },
  name: 'app',
  watch: {
    $route(to, from) {
      this.isOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.md-app {
  height: 100%;
}
</style>
