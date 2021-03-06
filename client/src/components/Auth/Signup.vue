<template>
  <v-container mt-5 pt-5>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text-center">Get Started Here</h1>
      </v-flex>
    </v-layout>

    <v-layout v-if="error" row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <form-alert :message="error.message"></form-alert>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card color="accent" dark>
          <v-container>
            <v-form
              v-model="isFormValid"
              lazy-validation
              ref="form"
              @submit.prevent="handleSignupUser"
            >
              <v-layout row>
                <v-flex xs12 mr-3 ml-3>
                  <v-text-field
                    :rules="usernameRules"
                    v-model="username"
                    prepend-icon="mdi-face"
                    label="Username"
                    type="text"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12 mr-3 ml-3>
                  <v-text-field
                    :rules="emailRules"
                    v-model="email"
                    prepend-icon="mdi-email"
                    label="Email"
                    type="email"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12 mr-3 ml-3>
                  <v-text-field
                    :rules="passwordRules"
                    v-model="password"
                    prepend-icon="mdi-form-textbox-password"
                    label="Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12 mr-3 ml-3>
                  <v-text-field
                    :rules="passwordRules"
                    v-model="passwordConfirmation"
                    prepend-icon="mdi-gavel"
                    label="Confirm Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout align-content-center column wrap>
                <div class="text-center">
                  <v-btn
                    :loading="loading"
                    :disabled="!isFormValid || loading"
                    color="info"
                    type="submit"
                  >
                    <span slot="loader" class="custom-loader">
                      <v-icon light>mdi-cached</v-icon>
                    </span>
                    Signup</v-btn
                  >
                </div>
                <h3>
                  Already have an account?
                  <router-link to="/signin">Signin</router-link>
                </h3>
              </v-layout>
            </v-form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Signup',
  data() {
    return {
      isFormValid: true,
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      usernameRules: [
        (username) => !!username || 'Username is required',
        (username) =>
          username.length < 10 || 'Username cannot be more than 10 characters',
      ],
      emailRules: [
        (email) => !!email || 'Email is required',
        (email) => /.@+./.test(email) || 'Email must be valid',
      ],
      passwordRules: [
        (password) => !!password || 'Password is required',
        (password) =>
          password.length >= 4 || 'Password must be at least 4 characters',
        (confirmation) =>
          confirmation === this.password || 'Passwords must match',
      ],
    };
  },
  watch: {
    user(value) {
      if (value) {
        this.$router.push('/');
      }
    },
  },
  computed: {
    ...mapGetters(['loading', 'error', 'user']),
  },
  methods: {
    handleSignupUser() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('signupUser', {
          username: this.username,
          email: this.email,
          password: this.password,
        });
      }
    },
  },
};
</script>
