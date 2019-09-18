<template>
  <div>
    <form novalidate class="md-layout md-alignment-center-center" @submit.prevent="validateForm">
      <md-card
        class="md-layout-center md-layout-item md-size-25 md-medium-size-66 md-small-size-100"
      >
        <md-card-header>
          <div class="md-title">Login</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-small-size-100">
            <md-field :class="getValidationClass('username')">
              <label for="username">Username</label>
              <md-input
                :disabled="sending"
                autocomplete="username"
                id="username"
                name="username"
                v-model="form.username"
              />
              <span class="md-error" v-if="!$v.form.username.required">Username is required</span>
            </md-field>
          </div>

          <div class="md-layout md-small-size-100">
            <md-field :class="getValidationClass('password')">
              <label for="password">Password</label>
              <md-input
                :disabled="sending"
                id="password"
                name="password"
                type="password"
                v-model="form.password"
              />
              <span class="md-error" v-if="!$v.form.password.required">Password is required</span>
            </md-field>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary md-raised" :disabled="sending">Login</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import LoginApi from '@/services/login.js';

import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'Login',
  mixins: [validationMixin],
  data: () => ({
    form: {
      username: null,
      password: null,
    },
    sending: false,
  }),
  validations: {
    form: {
      username: {
        required,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    clearForm() {
      this.$v.$reset();
      this.form.username = null;
      this.form.password = null;
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }
    },
    login() {
      this.sending = true;

      const payload = {
        username: this.form.username,
        password: this.form.password,
      };

      LoginApi.login(payload)
        .then(() => {
          this.$router.push('/');
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          this.sending = false;
        });
    },
    validateForm() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.login();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>
