<template>
  <div>
    <md-card class="md-layout-center md-layout-item">
      <md-card-content v-if="!goals.length">
        <md-empty-state
          md-rounded
          md-icon="event"
          md-label="Create your first goal"
          md-description="Seems you haven't created any goals. Get Slaying now!"
        >
          <md-button class="md-primary md-raised" @click="addGoal">Time to Slay</md-button>
        </md-empty-state>
      </md-card-content>

      <md-card-content v-if="goals.length">
        <md-table>
          <md-table-row>
            <md-table-head class="table__adjustment">Adjustments</md-table-head>
            <md-table-head>Description</md-table-head>
            <md-table-head>Frequency</md-table-head>
            <md-table-head class="table__icon">Edit</md-table-head>
            <md-table-head class="table__icon">Delete</md-table-head>
          </md-table-row>

          <md-table-row v-for="(goal, index) in goals" v-bind:key="`goal-${index}`">
            <md-table-cell class="table__adjustment">
              <div class="md-layout md-layout-nowrap">
                <md-button
                  class="md-primary md-raised goal__button goal__button--left"
                  :disabled="goal.edit"
                >
                  <md-icon class="goal__button-icon">check_circle</md-icon>
                </md-button>
                <md-button
                  class="md-accent md-raised goal__button goal__button--right"
                  :disabled="goal.edit"
                >
                  <md-icon class="goal__button-icon">cancel</md-icon>
                </md-button>
              </div>
            </md-table-cell>

            <md-table-cell>
              <div v-if="!goal.edit">
                <h2 class="table__goal-title">{{goal.title}}</h2>
                <p class="table__goal-description">{{goal.description}}</p>
              </div>

              <div v-if="goal.edit">
                <md-field>
                  <label :for="`goal-title-${index}`">Title</label>
                  <md-input
                    :id="`goal-title-${index}`"
                    :name="`goal-title-${index}`"
                    type="text"
                    v-model="goal.title"
                  />
                </md-field>
                <md-field>
                  <label :for="`goal-description-${index}`">Description</label>
                  <md-input
                    :id="`goal-description-${index}`"
                    :name="`goal-description-${index}`"
                    type="text"
                    v-model="goal.description"
                  />
                </md-field>
              </div>
            </md-table-cell>

            <md-table-cell
              v-if="!goal.edit"
            >{{goal.frequency.number}} time(s) a {{goal.frequency.interval}}</md-table-cell>

            <md-table-cell class="goal__frequency" v-if="goal.edit">
              <div class="md-layout md-alignment-end-center">
                <md-field class="goal__number">
                  <label :for="`goal-number-${index}`">No.</label>
                  <md-input
                    :id="`goal-number-${index}`"
                    :name="`goal-number-${index}`"
                    type="number"
                    v-model="goal.frequency.number"
                  />
                </md-field>
                <span class="goal__span">time(s) a</span>
                <md-field class="goal__interval">
                  <label :for="`goal-interval-${index}`">Select the interval</label>
                  <md-select
                    :name="`goal-interval-${index}`"
                    :id="`goal-interval-${index}`"
                    v-model="goal.frequency.interval"
                  >
                    <md-option value="day">Day</md-option>
                    <md-option value="week">Week</md-option>
                    <md-option value="month">Month</md-option>
                    <md-option value="year">Year</md-option>
                  </md-select>
                </md-field>
              </div>
            </md-table-cell>

            <md-table-cell class="table__icon" v-if="!goal.edit">
              <md-button class="md-icon-button" @click="goal.edit = true">
                <md-icon>edit</md-icon>
              </md-button>
            </md-table-cell>

            <md-table-cell class="table__icon" v-if="goal.edit">
              <md-button class="md-icon-button" @click="goal.edit = false">
                <md-icon>check</md-icon>
              </md-button>
            </md-table-cell>

            <md-table-cell class="table__icon">
              <md-button class="md-icon-button md-accent" @click="confirmDelete(index)">
                <md-icon>delete</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>

        <md-card-actions>
          <div>
            <md-button type="submit" class="md-primary md-raised" @click="addGoal">+ Add a Goal</md-button>
          </div>
        </md-card-actions>
      </md-card-content>
    </md-card>

    <md-dialog-confirm
      :md-active.sync="showDialog"
      md-title="Confirm Goal Deletion"
      md-content="Are you sure you wish to delete this goal?"
      md-confirm-text="Confirm"
      md-cancel-text="Cancel"
      @md-cancel="cancelDelete"
      @md-confirm="deleteSelectedGoal"
    />
  </div>
</template>

<script>
export default {
  name: 'Goal',
  data: () => ({
    goals: [
      {
        description: 'Complete a workout routine at the gym.',
        frequency: {
          interval: 'week',
          number: 4,
        },
        title: 'Lose Weight!',
        edit: false,
      },
      {
        description: 'Think about three positive things throughout the day',
        frequency: {
          interval: 'day',
          number: 3,
        },
        title: 'Be more positive',
        edit: false,
      },
    ],
    isEditing: false,
    selected: null,
    showDialog: false,
  }),
  methods: {
    addGoal() {
      const newGoal = {
        description: '',
        frequency: {
          interval: 'day',
          number: 1,
        },
        title: '',
        edit: true,
      };

      this.goals.push(newGoal);
    },
    cancelDelete() {
      this.selected = null;
      this.showDialog = false;
    },
    confirmDelete(index) {
      this.selected = index;
      this.showDialog = true;
    },
    deleteSelectedGoal() {
      this.goals.splice(this.selected, 1);
      this.selected = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.goal {
  &__button {
    font-size: 24px;
    margin: 0;
    min-width: 34px;
    &-icon {
      margin-top: -6px;
    }
    &--left {
      border-radius: 8px 0 0 8px;
    }
    &--right {
      border-radius: 0 8px 8px 0;
    }
  }
  &__frequency {
    max-width: 245px;
  }
  &__interval {
    max-width: 120px;
  }
  &__number {
    max-width: 20px;
  }
  &__span {
    margin: auto 16px;
  }
}
.table {
  &__adjustment {
    max-width: 118px;
  }
  &__goal-title {
    line-height: 1.2;
    margin: 0 0 8px;
  }
  &__goal-description {
    line-height: 1.2;
    margin: 0;
  }
  &__icon {
    text-align: center;
    width: 40px;
  }
}
</style>
