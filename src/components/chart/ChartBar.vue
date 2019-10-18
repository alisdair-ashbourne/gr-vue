<template>
  <div class="bar md-layout md-alignment-center-center">
    <div class="bar__container">
      <div class="bar__track"></div>
      <div class="bar__position bar__buffer" :style="progressBufferStyle"></div>
      <div class="bar__position bar__fill" :style="progressAmountStyle"></div>

      <md-avatar class="bar__avatar md-accent" :style="progressAvatarAmountStyle">
        <md-icon>group</md-icon>
        <md-tooltip>{{username}}</md-tooltip>
      </md-avatar>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    progressAvatarAmountStyle() {
      return `left: ${this.amount}%`;
    },
    progressAmountStyle() {
      return `transform: scale3d(${this.amount / 100}, 1, 1);`;
    },
    progressBufferStyle() {
      return `transform: scale3d(${this.buffer / 100}, 1, 1);`;
    },
  },
  props: {
    amount: {
      type: String,
      default: 0,
    },
    buffer: {
      type: String,
      default: 0,
    },
    username: {
      type: String,
    },
  },
  name: 'ChartBar',
};
</script>

<style lang="scss" scoped>
.bar {
  display: flex;
  flex: 1 1 auto;
  &__avatar {
    margin: 16px 0 0;
    position: absolute;
    transform-origin: center center;
    transform: translate3d(-56%, -83%, 0);
  }
  &__buffer {
    background-color: rgba(255, 82, 82, 0.38);
  }
  &__container {
    position: relative;
    height: 5px;
    width: 100%;
  }
  &__fill {
    background-color: red;
  }
  &__position {
    height: 5px;
    left: 0;
    position: absolute;
    transform-origin: left center;
    width: 100%;
  }
  &__track {
    width: 100%;
  }
}
</style>
