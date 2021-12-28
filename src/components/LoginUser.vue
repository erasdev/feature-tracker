<template>
  <div class="w-1/2 pt-20 mx-auto">
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
    user: function () {
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

<style>
</style>