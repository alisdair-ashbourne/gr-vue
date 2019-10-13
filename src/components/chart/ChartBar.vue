<template>
  <div class="bar md-layout md-alignment-center-center">
    <md-avatar class="bar__avatar md-accent">
      <md-icon>group</md-icon>
      <md-tooltip>{{username}}</md-tooltip>
    </md-avatar>

    <md-progress-bar
      class="md-layout md-accent"
      md-mode="buffer"
      :md-value="Number(amount)"
      :md-buffer="Number(buffer)"
    ></md-progress-bar>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  props: ['amount', 'buffer', 'username'],
  name: 'ChartBar',
};
</script>

<style lang="scss" scoped>
.bar {
  display: flex;
  flex: 1 1 auto;
  &__avatar {
    margin: 0 16px 0 0;
  }
}
</style>
