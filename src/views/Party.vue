<template>
  <div>
    <md-card>
      <md-card-header>
        <md-avatar>
          <md-icon class="md-primary">group</md-icon>
        </md-avatar>

        <div class="md-title">Party</div>
        <div
          class="md-subhead"
        >Check in on your group, see their progress, and give them a nudge for motivation</div>
      </md-card-header>
    </md-card>

    <div class="md-layout">
      <party-card v-bind:user="user" />
      <party-card v-bind:user="user" />
      <party-card v-bind:user="user" />
      <party-card v-bind:user="user" />
      <party-card v-bind:user="user" />
      <party-card v-bind:user="user" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import PartyCard from '@/components/party/PartyCard.vue';

export default {
  computed: {
    ...mapState('user', ['user']),
  },
  components: {
    'party-card': PartyCard,
  },
  name: 'Party',
};
</script>

<style lang="scss" scoped>
</style>
