<template>
  <md-card>
    <md-card-header class="chart-header">
      <md-avatar class="md-primary">
        <md-icon>group</md-icon>
      </md-avatar>

      <div class="md-title">The Avengers</div>
    </md-card-header>

    <md-card-content>
      <div class="chart">
        <img
          alt="Chart Background"
          class="chart__background"
          src="./../../assets/chart-background.png"
        />

        <div class="chart__bars">
          <slot></slot>
        </div>
      </div>
    </md-card-content>
  </md-card>
</template>

<script>
export default {
  data: () => ({}),
  name: 'ChartContainer',
};
</script>

<style lang="scss" scoped>
.chart-header {
  margin-bottom: 16px;
}
.chart {
  max-height: 600px;
  overflow: hidden;
  position: relative;
  &__background {
    background-size: 100%;
    width: 100%;
  }
  &__bars {
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    left: 0;
    padding: 32px;
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
