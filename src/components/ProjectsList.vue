<template>
  <div v-if="projects.length != 0" class="pt-20">
    <ul class="w-3/4 mx-auto space-y-6 sm:w-1/2 md:w-1/3">
      <li
        v-for="project in projects"
        :key="project.name"
        class="w-full p-6 transition ease-in-out transform bg-white rounded-md shadow-md  duration-450 hover:scale-105 hover:shadow-lg"
      >
        <router-link
          :to="
            '/users/' +
            $route.params.user +
            '/projects/' +
            toKebab(project.name)
          "
          ><p
            class="text-lg font-semibold tracking-wide text-gray-500 uppercase"
          >
            {{ project.name }}
          </p>
        </router-link>
      </li>
      <li v-if="this.permission === true" class="flex justify-center">
        <button
          @click="toggleModal()"
          type="type"
          class="flex items-center px-1 space-x-1 text-gray-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <p class="button-text">Create a new project</p>
        </button>
      </li>
    </ul>
    <!-- Create Project form -->

    <create-project-modal v-if="modal" v-on:close-modal="toggleModal()" />
  </div>
</template>

<script>
import CreateProjectModal from "@/components/CreateProjectModal.vue";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "ProjectsList",
  components: { CreateProjectModal },
  data() {
    return {
      modal: false,
    };
  },
  computed: {
    projects: function () {
      return this.$store.state.firebaseProjectList;
    },
    permission: function () {
      return (
        this.$store.state.user != null &&
        firebase.auth().currentUser.uid === this.projects[0].owner
      );
    },
  },
  methods: {
    toggleModal: function () {
      this.modal = !this.modal;
    },
    toKebab: function (input) {
      return input
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, "-")
        .toLowerCase();
    },
  },
};
</script>

<style>
</style>