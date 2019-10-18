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
      return `top: ${100 - this.amount}%`;
    },
    progressAmountStyle() {
      return `transform: scale3d(1, ${this.amount / 100}, 1);`;
    },
    progressBufferStyle() {
      return `transform: scale3d(1, ${this.buffer / 100}, 1);`;
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
  name: 'ChartBarVertical',
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
    transform: translate3d(-43%, -100%, 0);
  }
  &__buffer {
    background-color: rgba(255, 82, 82, 0.38);
  }
  &__container {
    height: 100%;
    position: relative;
    width: 5px;
  }
  &__position {
    bottom: 0;
    height: 100%;
    position: absolute;
    transform-origin: bottom center;
    width: 5px;
  }
  &__fill {
    background-color: red;
  }
  &__track {
    height: 100%;
  }
}
</style>
