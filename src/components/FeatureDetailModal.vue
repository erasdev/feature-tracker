<template>
  <div>
    <div class="bg-gray-600 modal-background bg-opacity-20 hidden-scrollbar">
      <div class="space-y-4 bg-white shadow-xl modal-foreground sm:max-w-xl">
        <div class="flex flex-row justify-between w-full h-10">
          <div>
            <div
              v-if="this.error.text != null"
              class="flex flex-row items-center p-2 space-x-2 text-red-500 rounded-sm  bg-red-50"
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
              <span>{{ error.text }}</span>
            </div>
          </div>

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

        <!-- <feature-detail-form :statusOptions="statusOptions" :edit="edit" /> -->

        <div>
          <form
            @submit.prevent
            class="flex flex-col w-full pt-2 pb-8 mx-auto space-y-12 text-left"
          >
            <div
              class="flex flex-row items-baseline justify-between form-header"
            >
              <!-- if has permission -->
              <!-- set FormStatus -->
              <div
                v-if="this.edit != null || this.add != false"
                class="flex flex-row space-x-2 sm:space-x-6"
              >
                <div
                  v-for="(status, index) in this.statusOptions"
                  :key="index"
                  class="min-w-max"
                >
                  <!--TODO: refactor to have a better id/for for input/label -->
                  <!--be mindful not to overlap id's with input/label in FilterStatusBar component -->
                  <!--or else things will stop working and you'll want to bang your head on the wall-->
                  <input
                    type="radio"
                    hidden
                    :id="status.emoji"
                    name="formstatus"
                    :value="status.label"
                    v-model="form.status"
                  />
                  <label
                    :for="status.emoji"
                    class="space-x-1 cursor-pointer  opacity-30 hover:opacity-100"
                    >{{ status.emoji }}
                    <!-- status.label only shows up when FormStatus has been set by above radio input-->
                    <span
                      v-if="form.status === status.label"
                      class="hidden text-sm font-semibold text-gray-500 uppercase pointer-events-none  sm:inline"
                      >{{ status.label }}</span
                    >
                  </label>
                </div>
              </div>
              <!-- else view status -->
              <div v-else>{{ findEmoji(form.status) }}{{ form.status }}</div>

              <div class="flex flex-row items-baseline space-x-2">
                <!-- Set MVP -->
                <div v-if="this.edit != null || this.add != false">
                  <input
                    type="checkbox"
                    id="mvp"
                    name="mvp"
                    hidden
                    v-model="form.mvp"
                  />
                  <label
                    for="mvp"
                    class="text-xs font-semibold tracking-wide text-gray-500 uppercase cursor-pointer  opacity-30"
                    >MVP</label
                  >
                </div>
                <div v-else>
                  <p
                    v-if="form.mvp === true"
                    class="text-xs font-semibold tracking-wide text-gray-500 uppercase "
                  >
                    MVP
                  </p>
                </div>

                <!-- if has permission -->
                <!-- Set Priority -->
                <div
                  v-if="this.edit != null || this.add != false"
                  class="cursor-pointer"
                  @click="setCurrentPriority($event)"
                >
                  <priority-indicator
                    class="pointer-events-none"
                    :class="form.priority"
                  />
                </div>

                <!-- else view priority -->
                <div v-else>
                  <priority-indicator
                    class="pointer-events-none"
                    :class="form.priority"
                  />
                </div>
              </div>
            </div>

            <!-- if has permission -->
            <!-- Set Name -->
            <div class="space-y-4 form-name-description">
              <div class="flex flex-col">
                <label for="featurename" class="mb-2 text-sm font-semibold"
                  >Feature Name</label
                >
                <input
                  required
                  v-if="this.edit != null || this.add != false"
                  type="text"
                  id="featurename"
                  name="featurename"
                  v-model="form.name"
                  class="p-2 border border-gray-200 rounded-md"
                />
                <!-- else view name -->
                <p v-else>
                  {{ form.name }}
                </p>
              </div>

              <div class="flex flex-col">
                <label
                  for="featuredescription"
                  class="mb-2 text-sm font-semibold"
                  >Description</label
                >
                <!-- if has permission -->
                <!-- Set Description -->
                <textarea
                  v-if="this.edit != null || this.add != false"
                  type="text"
                  id="featuredescription"
                  name="featuredescription"
                  v-model="form.description"
                  class="p-2 border border-gray-200 rounded-md"
                />
                <!-- else view description -->
                <p v-else>
                  {{ form.description }}
                </p>
              </div>
            </div>

            <!-- Set Notes -->
            <div class="flex flex-col space-y-2 form-notes">
              <div class="flex flex-row items-center justify-between mb-4">
                <label for="featurenotes" class="text-sm font-semibold"
                  >Notes</label
                >
                <button
                  v-if="edit != null || add != false"
                  @click="addNote()"
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
                  ><span class="button-text">add a note</span>
                </button>
              </div>

              <div v-if="form.notes.length === 0">
                <span class="text-xs italic">No notes</span>
              </div>

              <ul class="space-y-2">
                <li
                  v-for="(each, index) in form.notes"
                  :key="index"
                  class="flex flex-row items-center justify-between space-x-2"
                >
                  <input
                    v-if="edit != null || add != false"
                    type="text"
                    name="featurenotes"
                    class="w-full p-2 border border-gray-200 rounded-md"
                    placeholder="Add a new note"
                    v-model="form.notes[index].text"
                  />
                  <div v-else>
                    {{ form.notes[index].text }}
                  </div>

                  <button
                    v-if="edit != null || add != false"
                    type="button"
                    @click="deleteNewNote(index)"
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
                </li>
              </ul>
            </div>

            <div
              v-if="this.edit != null || this.add != false"
              class="flex flex-row justify-between"
            >
              <button
                type="button"
                @click="
                  deleteFeature();
                  $emit('close-modal');
                "
                class="text-red-400 border-transparent  btn bg-red-50 hover:text-red-600 hover:border-red-400 hover:shadow-sm"
              >
                Delete Feature
              </button>

              <button
                @click="saveFeature()"
                type="button"
                class="text-white bg-green-600 border-green-600 shadow-md  bg-opacity-90 btn hover:bg-opacity-100 hover:shadow-md"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PriorityIndicator from "@/components/PriorityIndicator";
import firebase from "firebase/app";
import "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { db } from "../db.js";

export default {
  components: { PriorityIndicator },
  name: "FeatureDetailModal",
  props: ["projectUID", "statusOptions", "edit", "view", "add"],
  data() {
    return {
      form: {
        name: "",
        description: "",
        status: "",
        priority: "none",
        mvp: false,
        uid: "",
        notes: [],
      },
      error: {
        text: null,
      },
    };
  },

  methods: {
    setCurrentPriority: function ($event) {
      //make sure you have class styles in priority indicator component to match options below
      //this function sets the form.priority field on this component
      //which is then passed as a prop to the priority indicator to set styles
      //is there a better way?
      let options = ["none", "low", "medium", "high"];
      let element = $event.target.firstChild;

      for (let i = 0; i < options.length; i++) {
        //if class list include very last option in array
        //cycle back to first item (at index 0)
        if (element.classList.contains(options[options.length - 1])) {
          element.classList.remove(options[options.length - 1]);
          element.classList.add(options[0]);
          this.form.priority = options[0];
          //otherwise remove current option
          //and add option at next index (increment ++)
        } else if (element.classList.contains(options[i])) {
          element.classList.remove(options[i]);
          element.classList.add(options[i++]);
          this.form.priority = options[i++];
        }
      }
    },
    addNote: function () {
      this.form.notes.push({ text: "" });
    },

    deleteNewNote: function (index) {
      let result = this.form.notes.filter(
        (note) => this.form.notes.indexOf(note) != index
      );
      this.form.notes = result;
    },
    setForm: function () {
      if (this.edit != null) {
        this.form = this.edit;
      } else if (this.view != null) {
        this.form = this.view;
      } else {
        this.form.status = this.statusOptions[0].label;
      }
    },

    findEmoji: function (search) {
      //sets array to the store object statusOptions
      //which includes emoji and label for each status
      let array = this.statusOptions;

      //filters above array to get the keys
      //which are "emoji" and "label"
      //then returns that key:value pair if any key
      //has value that match the input search

      if (this.form.status) {
        let result = array.filter((object) =>
          Object.keys(object).some((key) => object[key].includes(search))
        );
        //the above returns an array
        //so identify first object of the array
        //and pull the emoji value
        return result[0].emoji;
      }
    },
    saveFeature: function () {
      if (
        this.add === true &&
        this.form.name != "" &&
        this.form.description != ""
      ) {
        this.error.text = null;
        this.$emit("close-modal");
        // return the promise so we can await the write
        return db.collection("features").add({
          name: this.form.name,
          description: this.form.description,
          status: this.form.status,
          priority: this.form.priority,
          mvp: this.form.mvp,
          owner: firebase.auth().currentUser.uid,
          project: this.projectUID,
          notes: this.form.notes,
          uid: uuidv4(),
        });
      } else if (
        this.edit != null &&
        this.form.name != "" &&
        this.form.description != ""
      ) {
        const documents = db
          .collection("features")
          .where("uid", "==", this.form.uid);

        documents.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const docRef = doc.id;

            return db.collection("features").doc(docRef).update({
              name: this.form.name,
              description: this.form.description,
              status: this.form.status,
              priority: this.form.priority,
              mvp: this.form.mvp,
              owner: firebase.auth().currentUser.uid,
              project: this.projectUID,
              uid: this.form.uid,
              notes: this.form.notes,
            });
          });
        });
        this.$emit("close-modal");
      } else {
        this.error.text = "Oops! Every feature needs a name and a description!";
      }
    },
    deleteFeature: function () {
      db.collection("features")
        .where("uid", "==", this.form.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            db.collection("features").doc(doc.id).delete();
          });
        });
    },
  },
  mounted() {
    this.setForm();
  },
};
</script>

<style scoped>
input:checked + label {
  opacity: 1;
}
</style>