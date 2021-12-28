<template>
  <div class="bg-white">
    <div class="flex flex-row items-center justify-between p-4">
      <div class="flex justify-start w-1/4 h-10">
        <button type="button" class="text-gray-300 hover:text-gray-500">
          <router-link :to="'/users/' + $route.params.user" class="text-gray-300 hover:text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              /></svg
          ></router-link>
        </button>
      </div>
      <div class="flex flex-row items-center space-x-1">
        <h3 v-if="name" class="text-xl font-semibold tracking-wider text-gray-600 uppercase min-w-max">
          {{ name }}
        </h3>
        <button
          v-if="permission === true"
          type="button"
          class="text-gray-300 hover:text-gray-400"
          @click="toggleModal()"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
      </div>
      <div class="flex flex-row items-center justify-end w-1/4 h-10 space-x-3">
        <div class="flex items-baseline space-x-1 text-gray-300">
          <button type="button" class="hover:text-gray-400">
            <a href="/"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                /></svg
            ></a>
          </button>
          <button type="button" class="hover:text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>
        </div>
        <button
          v-if="this.$store.state.user != null"
          type="button"
          @click="signOut()"
          class="hidden px-4 py-2 text-sm text-gray-500 border rounded-md md:inline min-w-max hover:bg-gray-200"
        >
          <p>Sign out</p>
        </button>
        <button
          v-else
          type="button"
          @click="signIn()"
          class="hidden px-4 py-2 text-sm text-gray-500 border rounded-md md:inline hover:bg-gray-200"
        >
          <p>Sign in</p>
        </button>
      </div>
    </div>

    <project-settings-modal
      v-if="this.modal"
      v-on:close-modal="toggleModal()"
      class="bg-gray-600 modal bg-opacity-20 hidden-scrollbar"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ProjectSettingsModal from "@/components/ProjectSettingsModal.vue";
export default {
  name: "TopNavigationBar",
  components: { ProjectSettingsModal },
  data() {
    return {
      modal: false,
    };
  },
  props: ["name", "permission"],

  methods: {
    ...mapActions(["authAction", "signOutAction"]),
    signOut: function() {
      this.$store.state.permission = !this.$store.state.permission;
      this.signOutAction();
    },
    signIn: function() {
      this.$router.push({ name: "Login" });
    },
    toggleModal: function() {
      this.modal = !this.modal;
    },
  },
};
</script>

<style></style>
