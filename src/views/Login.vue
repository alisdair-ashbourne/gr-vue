<template>
  <div>
    <form novalidate class="md-layout md-alignment-center-center" @submit.prevent="validateForm">
      <md-card
        class="md-layout-center md-layout-item md-size-25 md-medium-size-66 md-small-size-100"
      >
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

        <md-snackbar md-position="center" :md-active.sync="showSnackbar">
          <span>Incorrect credentials. Try again</span>
        </md-snackbar>
      </md-card>
    </form>
  </div>
</template>

<script>
import AuthenticationApi from '@/services/authentication.js';

import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  data: () => ({
    form: {
      username: null,
      password: null,
    },
    sending: false,
    showSnackbar: false,
  }),
  methods: {
    clearForm() {
      this.$v.$reset();
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

      AuthenticationApi.login(payload)
        .then(response => {
          this.$store.commit('authentication/updateIsLoggedIn', true);
          this.$store.commit('user/updateUser', response.data.user);

          this.$router.push('/');
        })
        .catch(error => {
          this.showSnackbar = true;
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
  mixins: [validationMixin],
  name: 'Login',
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
