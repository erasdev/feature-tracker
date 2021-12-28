<template>
  <div class="w-1/2 pt-20 mx-auto">
    <form
      @submit.prevent="register()"
      class="flex flex-col p-2 space-y-4 text-left"
    >
      <h2>Register</h2>
      <div class="space-x-2">
        <input
          type="email"
          placeholder="Email address..."
          v-model="form.email"
          class="p-2 border rounded-md"
        />
        <input
          type="username"
          placeholder="username..."
          v-model="form.username"
          class="p-2 border rounded-md"
        />
        <input
          type="password"
          placeholder="password..."
          v-model="form.password"
          class="p-2 border rounded-md"
        />
        <button type="submit" class="px-4 py-2 border rounded-md">
          Register
        </button>
      </div>
    </form>
  </div>
</template>


<script>
import { mapActions } from "vuex";
import "firebase/auth";

export default {
  name: "RegisterUser",
  data() {
    return {
      form: {
        email: "",
        password: "",
        username: "",
      },
      error: null,
    };
  },
  methods: {
    // register() {
    //   firebase
    //     .auth()
    //     .createUserWithEmailAndPassword(this.form.email, this.form.password)
    //     .then((response) => {
    //       console.log("Success! ", response);
    //     })
    //     .catch((error) => {
    //       console.log("Failed!", error);
    //     });
    // },
    ...mapActions(["signUpAction"]),
    register() {
      this.signUpAction({
        email: this.form.email,
        password: this.form.password,
        username: this.form.username,
      });
    },
  },
};
</script>