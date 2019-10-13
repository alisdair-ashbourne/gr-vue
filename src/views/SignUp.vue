<template>
  <div>
    <form novalidate class="md-layout md-alignment-center-center" @submit.prevent="validateForm">
      <md-card
        class="md-layout-center md-layout-item md-size-25 md-medium-size-66 md-small-size-100"
      >
        <md-card-content>
          <div class="md-layout md-small-size-100">
            <div class="avatar">
              <md-avatar class="md-large">
                <img alt="Avatar" v-bind:src="form.image.data" v-if="form.image && form.image.data" />
                <md-icon v-else>account_circle</md-icon>
              </md-avatar>
            </div>

            <div class="md-layout md-small-size-75">
              <md-field>
                <label for="image">Profile Image (Optional)</label>
                <md-file
                  :disabled="sending"
                  accept="image/*"
                  id="image"
                  name="image"
                  @md-change="handleImageChange"
                  v-model="form.image.filename"
                />
              </md-field>
            </div>
          </div>

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
            <md-field :class="getValidationClass('email')">
              <label for="email">Email</label>
              <md-input
                :disabled="sending"
                autocomplete="email"
                id="email"
                name="email"
                v-model="form.email"
              />
              <span class="md-error" v-if="!$v.form.email.required">Email is required</span>
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
              <span
                class="md-error"
                v-if="!$v.form.password.minLength"
              >Password must contain 6 characters</span>
            </md-field>
          </div>

          <div class="md-layout md-small-size-100">
            <md-field :class="getValidationClass('confirmPassword')">
              <label for="confirmPassword">Confirm Password</label>
              <md-input
                :disabled="sending"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                v-model="form.confirmPassword"
              />
              <span class="md-error" v-if="!$v.form.confirmPassword.required">Confirm your password</span>
              <span
                class="md-error"
                v-if="!$v.form.confirmPassword.sameAsPassword && $v.form.confirmPassword.required"
              >Password must match</span>
            </md-field>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary md-raised" :disabled="sending">Sign Up</md-button>
        </md-card-actions>

        <md-snackbar md-position="center" :md-active.sync="showSnackbar">
          <span>{{snackbarText}}</span>
        </md-snackbar>
      </md-card>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { validationMixin } from 'vuelidate';
import {
  minLength,
  required,
  requiredIf,
  sameAs,
  sameAsPassword,
} from 'vuelidate/lib/validators';

import UserApi from '@/services/user.service.js';

export default {
  data: () => ({
    form: {
      confirmPassword: null,
      email: null,
      image: {
        data: '',
        filename: '',
      },
      password: null,
      username: null,
    },
    sending: false,
    showSnackbar: false,
    snackbarText: '',
  }),
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }
    },
    handleImageChange(files) {
      const reader = new FileReader();

      reader.addEventListener(
        'load',
        () => {
          this.form.image = {
            data: reader.result,
            filename: files[0].name,
          };
        },
        false
      );

      if (files.length) {
        reader.readAsDataURL(files[0]);
      }
    },
    updateUser() {
      this.sending = true;

      const payload = {
        email: this.form.email,
        image: this.form.image,
        password: this.form.password,
        username: this.form.username,
      };

      UserApi.create(payload)
        .then(response => {
          this.showSnackbar = true;
          this.snackbarText = 'Account created!';

          this.$router.push('/login');
        })
        .catch(error => {
          this.snackbarText = 'Error updating account: Please try again later.';
        })
        .finally(() => {
          this.sending = false;
        });
    },
    validateForm() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.updateUser();
      }
    },
  },
  mixins: [validationMixin],
  name: 'SignUp',
  validations: {
    form: {
      confirmPassword: {
        required: requiredIf(function(passwordModel) {
          return !!passwordModel.password;
        }),
        sameAsPassword: sameAs('password'),
      },
      email: {
        required,
      },
      password: {
        minLength: minLength(6),
        required,
      },
      username: {
        required,
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar {
  margin-right: 16px;
}
</style>