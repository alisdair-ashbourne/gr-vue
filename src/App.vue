<template>
  <md-app md-mode="reveal">
    <md-app-toolbar class="md-secondary">
      <md-button class="md-icon-button" @click="isOpen = !isOpen">
        <md-icon>menu</md-icon>
      </md-button>

      <div class="md-title">{{currentPage}}</div>
    </md-app-toolbar>

    <md-app-drawer :md-active.sync="isOpen">
      <md-toolbar class="md-transparent" md-elevation="1">
        <div class="md-title toolbar__title">Slayers</div>
      </md-toolbar>

      <md-divider />

      <md-list>
        <md-list-item to="/account" v-if="isLoggedIn">
          <md-avatar>
            <img alt="Avatar" v-bind:src="user.image.data" v-if="user.image && user.image.data" />
            <md-icon v-else>account_circle</md-icon>
          </md-avatar>
          <span class="md-list-item-text">Account</span>
        </md-list-item>

        <md-list-item to="/">
          <md-icon>move_to_inbox</md-icon>
          <span class="md-list-item-text">Home</span>
        </md-list-item>

        <md-list-item to="/" v-if="isLoggedIn" @click="handleLogout">
          <md-icon>send</md-icon>
          <span class="md-list-item-text">Logout</span>
        </md-list-item>

        <md-list-item to="/login" v-else>
          <md-icon>send</md-icon>
          <span class="md-list-item-text">Login</span>
        </md-list-item>
      </md-list>
    </md-app-drawer>

    <md-app-content>
      <router-view></router-view>
    </md-app-content>
  </md-app>
</template>

<script>
import { mapState } from 'vuex';

import AuthenticationApi from '@/services/authentication.js';

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
    ...mapState('user', ['user']),
  },
  created() {
    this.$store.dispatch('authentication/checkLoginStatus');
    console.log('TCL: this.$route', this.$route);
  },
  data: () => ({
    currentPage: 'Slayers',
    isOpen: false,
  }),
  methods: {
    handleLogout() {
      AuthenticationApi.logout().then(() => {
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
      this.currentPage = to.name;
    },
  },
};
</script>

<style lang="scss" scoped>
.md-app {
  height: 100%;
}
.toolbar__title {
  margin: 16px 0;
  width: 100%;
}
</style>
