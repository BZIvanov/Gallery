<template>
  <v-container mt-5 pt-5>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text-center">Welcome Back!</h1>
      </v-flex>
    </v-layout>

    <v-layout v-if="error" row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <form-alert :message="error.message"></form-alert>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card color="secondary" dark>
          <v-container>
            <v-form
              v-model="isFormValid"
              lazy-validation
              ref="form"
              @submit.prevent="handleSigninUser"
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
                    :rules="passwordRules"
                    v-model="password"
                    prepend-icon="mdi-form-textbox-password"
                    label="Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout align-content-center column wrap>
                <div class="text-center">
                  <v-btn
                    :loading="loading"
                    :disabled="!isFormValid"
                    color="accent"
                    type="submit"
                  >
                    <span slot="loader" class="custom-loader">
                      <v-icon light>mdi-cached</v-icon>
                    </span>
                    Signin</v-btn
                  >
                </div>
                <h3>
                  Don't have an account?
                  <router-link to="/signup">Signup</router-link>
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
  name: 'Signin',
  data() {
    return {
      isFormValid: true,
      username: '',
      password: '',
      usernameRules: [
        (username) => !!username || 'Username is required',
        (username) =>
          username.length < 10 || 'Username must be less than 10 characters',
      ],
      passwordRules: [
        (password) => !!password || 'Password is required',
        (password) =>
          password.length >= 4 || 'Password must be at least 4 characters',
      ],
    };
  },
  computed: {
    ...mapGetters(['loading', 'error', 'user']),
  },
  watch: {
    user(value) {
      if (value) {
        this.$router.push('/');
      }
    },
  },
  methods: {
    handleSigninUser() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('signinUser', {
          username: this.username,
          password: this.password,
        });
      }
    },
  },
};
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
