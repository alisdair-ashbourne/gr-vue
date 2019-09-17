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

        <router-link to="/login">
          <md-list-item>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Login</span>
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
import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';

export default {
  components: {
    Home,
    Login,
  },
  data: () => ({
    isOpen: false,
  }),
  name: 'app',
  watch: {
    $route(to, from) {
      this.isOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
