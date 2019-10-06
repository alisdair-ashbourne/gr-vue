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
                <img alt="Avatar" v-bind:src="user.image.data" v-if="user.image && user.image.data" />
                <md-icon v-else>account_circle</md-icon>
              </md-avatar>
            </div>

            <div>
              <md-field>
                <label for="image">Profile Image</label>
                <md-file
                  :disabled="sending"
                  accept="image/*"
                  id="image"
                  name="image"
                  @md-change="handleImageChange"
                  v-model="user.image.filename"
                />
              </md-field>
            </div>
          </div>

          <div class="md-layout md-small-size-100">
            <md-field :class="getUserValidationClass('username')">
              <label for="username">Username</label>
              <md-input
                :disabled="sending"
                autocomplete="username"
                id="username"
                name="username"
                v-model="user.username"
              />
              <span class="md-error" v-if="!$v.user.username.required">Username is required</span>
            </md-field>
          </div>

          <div class="md-layout md-small-size-100">
            <md-field :class="getUserValidationClass('email')">
              <label for="email">Email</label>
              <md-input
                :disabled="sending"
                autocomplete="email"
                id="email"
                name="email"
                v-model="user.email"
              />
              <span class="md-error" v-if="!$v.user.email.required">Email is required</span>
            </md-field>
          </div>

          <div class="md-layout md-small-size-100">
            <md-field :class="getFormValidationClass('password')">
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
            <md-field :class="getFormValidationClass('confirmPassword')">
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

        <md-card-actions class="md-alignment-space-between">
          <md-button class="md-accent" :disabled="sending" @click="showDialog = true">Delete Account</md-button>
          <md-button type="submit" class="md-primary md-raised" :disabled="sending">Update</md-button>
        </md-card-actions>

        <md-snackbar md-position="center" :md-active.sync="showSnackbar">
          <span>{{snackbarText}}</span>
        </md-snackbar>
      </md-card>
    </form>

    <md-dialog-confirm
      :md-active.sync="showDialog"
      md-title="Confirm Account Deletion"
      md-content="This action cannot be undone. Are you sure you want to delete your account?"
      md-confirm-text="Confirm"
      md-cancel-text="Cancel"
      @md-cancel="showDialog = false"
      @md-confirm="deleteUserAccount"
    />
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

import UserApi from '@/services/user.js';

export default {
  computed: {
    ...mapState('user', ['user']),
  },
  data: () => ({
    form: {
      password: null,
      confirmPassword: null,
    },
    sending: false,
    showDialog: false,
    showSnackbar: false,
    snackbarText: '',
  }),
  async created() {
    if (!this.user.id) {
      await this.getUserFromRequest();
    }
  },
  methods: {
    getFormValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }
    },
    async getUserFromRequest() {
      const user = await UserApi.getThisUser();

      this.$store.dispatch('user/setUser', user.data);
    },
    getUserValidationClass(fieldName) {
      const field = this.$v.user[fieldName];

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }
    },
    async deleteUserAccount() {
      await UserApi.deleteThisUser();

      this.$router.push('/');
      this.$store.commit('authentication/updateIsLoggedIn', false);
      this.$store.dispatch('user/setUser', null);
    },
    handleImageChange(files) {
      const reader = new FileReader();

      reader.addEventListener(
        'load',
        () => {
          const payload = {
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
        image: this.user.image,
        username: this.user.username,
      };

      if (this.form.password) {
        payload.password = this.form.password;
      }

      UserApi.update(payload, this.user.id)
        .then(response => {
          this.snackbarText = 'Account details updated';
        })
        .catch(error => {
          this.snackbarText = 'Error updating account: Please try again later';
        })
        .finally(() => {
          this.sending = false;
          this.showSnackbar = true;
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
  name: 'Account',
  validations: {
    user: {
      email: {
        required,
      },
      username: {
        required,
      },
    },
    form: {
      confirmPassword: {
        required: requiredIf(function(passwordModel) {
          return !!passwordModel.password;
        }),
        sameAsPassword: sameAs('password'),
      },
      password: {
        minLength: minLength(6),
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