<template>
  <md-card class="party">
    <md-card-header>
      <md-avatar>
        <img alt="Avatar" v-bind:src="user.image.data" v-if="user.image && user.image.data" />
        <md-icon v-else>account_circle</md-icon>
      </md-avatar>

      <h2 class="md-title">{{user.username}}</h2>
      <h4 class="md-subhead">
        <span>User since</span>
        <span>{{formatDate(user.createdAt)}}</span>
      </h4>
    </md-card-header>

    <md-card-content>
      <md-table>
        <md-table-row>
          <md-table-head>Goal</md-table-head>
          <md-table-head>Updated</md-table-head>
        </md-table-row>

        <md-table-row>
          <md-table-cell>
            <h3>Lose Weight!</h3>
            <p>Complete a workout routine at the gym.</p>
          </md-table-cell>
          <md-table-cell>A week ago</md-table-cell>
        </md-table-row>
      </md-table>

      <div class="md-layout md-alignment-space-between">
        <md-button class="md-primary md-raised">Message</md-button>

        <div class="md-layout md-alignment-center-center">
          <md-button class="md-primary md-raised goal__button goal__button--left">
            <md-icon class="goal__button-icon">check_circle</md-icon>
            <md-tooltip>Encourage</md-tooltip>
          </md-button>
          <md-button class="md-accent md-raised goal__button goal__button--right">
            <md-icon class="goal__button-icon">cancel</md-icon>
            <md-tooltip>Nag</md-tooltip>
          </md-button>
        </div>

        <md-button class="md-raised">Promote</md-button>
      </div>
    </md-card-content>
  </md-card>
</template>

<script>
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

export default {
  data: () => ({}),
  props: ['user'],
  methods: {
    formatDate(date) {
      return format(parseISO(date), 'do MMM yyyy');
    },
  },
  name: 'PartyCard',
};
</script>

<style lang="scss" scoped>
.goal {
  &__button {
    font-size: 24px;
    min-width: 34px;
    &-icon {
      margin-top: -6px;
    }
    &--left {
      border-radius: 8px 0 0 8px;
      margin-right: 0;
    }
    &--right {
      border-radius: 0 8px 8px 0;
      margin-left: 0;
    }
  }
}
.party {
  margin-bottom: 8px;
  max-width: 350px;
}
</style>
