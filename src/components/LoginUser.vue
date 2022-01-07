<template>
  <!-- <div class="w-1/2 pt-20 mx-auto">
    <form
      @submit.prevent="login()"
      class="flex flex-col p-2 space-y-4 text-left"
    >
      <h2>Login</h2>
      <div class="space-x-2">
        <input
          type="email"
          placeholder="Email address..."
          v-model="form.email"
          class="p-2 border rounded-md"
        />
        <input
          type="password"
          placeholder="password..."
          v-model="form.password"
          class="p-2 border rounded-md"
        />
        <button type="submit" class="px-4 py-2 border rounded-md">Login</button>
      </div>
    </form>
  </div> -->
  <div class="flex flex-col justify-center min-h-full py-20 sm:px-6 lg:px-8">
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="px-4 py-8 bg-white shadow-lg sm:rounded-lg sm:px-10">
        <form class="space-y-6 text-left" @submit.prevent="login()">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-500">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required=""
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-500">
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required=""
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              />
            </div>
          </div>

          <div class="flex items-center justify-center">
            <div class="text-sm">
              <a href="#" class="font-medium text-gray-500 hover:text-gray-600">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex justify-center w-full px-4 py-2 text-sm font-semibold tracking-wide text-white uppercase bg-gray-500 border border-gray-500 rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "LoginUser",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      error: null,
    };
  },
  computed: {
    user: function() {
      if (getUser != null) {
        return this.$store.state.getUser.uid;
      }
    },
  },
  methods: {
    ...mapActions(["signInAction"]),
    login() {
      this.signInAction({
        email: this.form.email,
        password: this.form.password,
      });

      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style></style>
