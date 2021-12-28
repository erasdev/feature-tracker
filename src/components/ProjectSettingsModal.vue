<template>
  <div class="bg-gray-600 modal-background bg-opacity-20 hidden-scrollbar">
    <div class="space-y-4 bg-white shadow-xl modal-foreground sm:max-w-xl">
      <div class="flex flex-col space-y-12">
        <form @submit.prevent class="flex flex-col space-y-4">
          <div class="flex flex-row justify-end w-full">
            <button type="button" @click="$emit('close-modal')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div class="flex flex-col">
            <label for="projectname" class="font-semibold">Project name</label>
            <input
              required
              type="text"
              id="projectname"
              class="p-2 border rounded-md"
              placeholder="Project Name"
              v-model="project.name"
            />
          </div>
          <div class="flex flex-col">
            <label for="projectname" class="font-semibold"
              >Project description</label
            >
            <textarea
              required
              type="text"
              id="projectdescription"
              class="p-2 border rounded-md"
              placeholder="Project Description"
              v-model="project.description"
            />
          </div>
        </form>
        <div class="flex flex-row justify-between">
          <button
            type="button"
            @click="deleteProject()"
            class="text-red-400 border-transparent  btn bg-red-50 hover:text-red-600 hover:border-red-400 hover:shadow-sm"
          >
            Delete Project
          </button>
          <button
            @click="
              saveProject();
              $emit('close-modal');
            "
            type="button"
            class="text-white bg-green-600 border-green-600 shadow-md  bg-opacity-90 btn hover:bg-opacity-100 hover:shadow-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../db.js";
export default {
  name: "ProjectSettingsModal",
  data() {
    return {
      project: {},
    };
  },
  computed: {
    projectKebab: function () {
      return this.project.name
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, "-")
        .toLowerCase();
    },
  },

  methods: {
    setForm: function () {
      this.project = this.$store.state.firebaseProject[0];
    },

    deleteProject: function () {
      const projectKebab = this.$route.params.project;
      const projectString = projectKebab
        .split("-")
        .map((word) => {
          return word.slice(0, 1).toUpperCase() + word.slice(1);
        })
        .join(" ");

      db.collection("projects")
        .where("name", "==", projectString)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            db.collection("projects").doc(doc.id).delete();
          });
        });

      db.collection("features")
        .where("project", "==", this.project.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            db.collection("features").doc(doc.id).delete();
          });
        });

      this.$router.push({
        name: "User",
        params: { user: this.$route.params.user },
      });
    },
    saveProject: function () {
      const projectRef = db
        .collection("projects")
        .where("uid", "==", this.project.uid);

      projectRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const docRef = doc.id;

          return db
            .collection("projects")
            .doc(docRef)
            .update({
              name: this.project.name
                .split(" ")
                .map((word) => {
                  return word.slice(0, 1).toUpperCase() + word.slice(1);
                })
                .join(" "),
              description: this.project.description,
            });
        });
      });

      this.$router.push({
        name: "User",
        params: { user: this.$route.params.user },
      });
    },
  },
  mounted() {
    this.setForm();
  },
};
</script>

<style>
</style>