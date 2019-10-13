<template>
  <div>
    <md-card>
      <md-card-header>
        <md-avatar>
          <md-icon class="md-primary">group</md-icon>
        </md-avatar>

        <div class="md-title">Chart</div>
        <div class="md-subhead">Check the progress of your parties for the month</div>
      </md-card-header>
    </md-card>

    <chart-container>
      <chart-bar amount="24" buffer="73" username="Captain" />
      <chart-bar amount="32" buffer="73" username="PacificFrost" />
      <chart-bar amount="72" buffer="73" username="Tetsuya" />
      <chart-bar amount="12" buffer="73" username="User336" />
      <chart-bar amount="18" buffer="73" username="WillemOutDedoor" />
      <chart-bar amount="68" buffer="73" username="ReynoldsMal" />
    </chart-container>
  </div>
</template>

<script>
import ChartBar from '@/components/chart/ChartBar.vue';
import ChartContainer from '@/components/chart/ChartContainer.vue';

export default {
  name: 'Chart',
  components: {
    'chart-bar': ChartBar,
    'chart-container': ChartContainer,
  },
};
</script>

<style lang="scss" scoped>
</style>
