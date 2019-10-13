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
          <md-icon>dashboard</md-icon>
          <span class="md-list-item-text">Home</span>
        </md-list-item>

        <div v-if="isLoggedIn">
          <md-list-item to="/goals">
            <md-icon>check</md-icon>
            <span class="md-list-item-text">Goals</span>
          </md-list-item>

          <md-list-item to="/chart">
            <md-icon>insert_chart_outlined</md-icon>
            <span class="md-list-item-text">Chart</span>
          </md-list-item>

          <md-list-item to="/party">
            <md-icon>group</md-icon>
            <span class="md-list-item-text">Party</span>
          </md-list-item>
        </div>

        <md-list-item to="/login" v-else>
          <md-icon>exit_to_app</md-icon>
          <span class="md-list-item-text">Login</span>
        </md-list-item>

        <md-list-item to="/" v-if="isLoggedIn" @click="handleLogout">
          <md-icon>exit_to_app</md-icon>
          <span class="md-list-item-text">Logout</span>
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

import AuthenticationApi from '@/services/authentication.service.js';

import Account from '@/views/Account.vue';
import Goal from '@/views/Goal.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import SignUp from '@/views/SignUp.vue';

export default {
  components: {
    Account,
    Home,
    Login,
    SignUp,
  },
  computed: {
    ...mapState('user', ['isLoggedIn', 'user']),
  },
  created() {
    this.$store.dispatch('user/checkLoginStatus');
  },
  data: () => ({
    currentPage: 'Slayers',
    isOpen: false,
  }),
  methods: {
    handleLogout() {
      AuthenticationApi.logout().then(() => {
        this.$store.commit('user/updateIsLoggedIn', false);
        this.$store.commit('user/updateUser', null);
        this.isOpen = false;
      });
    },
  },
  name: 'app',
  watch: {
    $route(to, from) {
      this.currentPage = to.name;
      this.isOpen = false;
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
