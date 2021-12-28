<template>
  <div class="bg-gray-600 modal-background bg-opacity-20 hidden-scrollbar">
    <form
      @submit.prevent
      class="space-y-4 bg-white shadow-xl modal-foreground sm:max-w-xl"
    >
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
        <label for="projectname" class="font-semibold">Project name:</label>
        <input
          required
          minlength="3"
          maxlength="40"
          type="text"
          id="projectname"
          class="p-2 border rounded-md"
          placeholder="Project Name"
          v-model="project.name"
        />
      </div>

      <div class="flex flex-col">
        <label for="projectname" class="font-semibold"
          >Project description:</label
        >
        <textarea
          required
          type="text"
          minlength="3"
          maxlength="180"
          id="projectdescription"
          class="p-2 border rounded-md"
          placeholder="Project Description"
          v-model="project.description"
        />
      </div>

      <div class="space-y-2">
        <h2 class="font-semibold">Status Options:</h2>
        <div
          v-for="(each, index) in project.statusOptions"
          :key="index"
          class="flex flex-row space-x-2"
        >
          <!-- <label for="statuslable">Status Emoji:</label> -->
          <input
            required
            type="text"
            id="statusemoji"
            size="1"
            class="p-2 border rounded-md"
            placeholder="🎉"
            v-model="project.statusOptions[index].emoji"
          />

          <!-- <label for="statuslabel">Status label:</label> -->
          <input
            required
            type="text"
            minlength="3"
            maxlength="20"
            id="statuslabel"
            class="p-2 border rounded-md"
            placeholder="Status Label"
            v-model="project.statusOptions[index].label"
          />
          <button
            v-if="index != 0"
            type="button"
            @click="deleteStatus(index)"
            :id="index"
            class="text-gray-300 hover:text-gray-400"
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <button
        @click="addStatus"
        type="button"
        class="flex flex-row items-center justify-center space-x-1 text-gray-300  hover:text-gray-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          /></svg
        ><span class="button-text">add another status option</span>
      </button>

      <div
        class="flex flex-col justify-between space-y-4  sm:space-y-0 sm:items-center sm:flex-row"
      >
        <div>
          <h2
            v-if="this.error.text != null"
            class="flex flex-row p-2 space-x-2 text-red-500 rounded-sm  bg-red-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="inline w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            <span>Oops! {{ error.text }}</span>
          </h2>
        </div>
        <button
          @click="submitForm()"
          type="button"
          class="text-white bg-green-600 border-green-600 shadow-md  bg-opacity-90 btn hover:bg-opacity-100 hover:shadow-md"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { db } from "../db.js";
import firebase from "firebase/app";
import "firebase/auth";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "CreateProjectModal",

  data() {
    return {
      project: {
        name: null,
        description: null,
        statusOptions: [
          {
            label: null,
            emoji: null,
          },
        ],
      },
      error: {
        text: null,
      },
    };
  },
  methods: {
    addStatus: function () {
      this.project.statusOptions.push({ label: "", emoji: "" });
    },
    submitForm: function () {
      if (
        this.project.name != null &&
        this.project.description != null &&
        this.project.statusOptions[0].label != null &&
        this.project.statusOptions[0].emoji != null
      ) {
        db.collection("projects").add({
          name: this.project.name
            .split(" ")
            .map((word) => {
              return word.slice(0, 1).toUpperCase() + word.slice(1);
            })
            .join(" "),
          description: this.project.description,
          status_options: this.project.statusOptions,
          owner: firebase.auth().currentUser.uid,
          uid: uuidv4(),
        });
        this.$emit("close-modal");
        this.resetForm();
      } else {
        this.error.text = "All fields are required to create a new project.";
      }
    },
    resetForm: function () {
      this.project.name = null;
      this.project.description = null;
      this.statusOptions = [{ label: "", emoji: "" }];
    },
    deleteStatus: function (index) {
      let result = this.project.statusOptions.filter(
        (status) => this.project.statusOptions.indexOf(status) != index
      );
      this.project.statusOptions = result;
    },
  },
};
</script>

<style>
</style>