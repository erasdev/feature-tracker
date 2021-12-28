<template>
  <div class="h-full px-8 py-12">
    <div class="space-y-6">
      <!-- if has permission -->
      <!-- add feature button -->
      <div
        class="flex flex-col items-center gap-6  sm:gap-0 sm:justify-between sm:flex-row px-14 md:px-2"
      >
        <!-- <add-feature-button
          v-if="this.$store.state.permission === true"
          @click="$emit('new-feature')"
        /> -->
        <div
          class="flex flex-row order-2 space-x-4 text-gray-400  sm:order-1 button-text"
        >
          <p>Sort by:</p>
          <button type="button">Date</button>
          <button type="button">A to Z</button>
          <button type="button">Priority</button>
        </div>
        <button
          v-if="permission === true"
          @click="$emit('add-feature')"
          class="flex items-center order-1 space-x-1 text-gray-400 sm:order-2"
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
          <p class="button-text">Add a feature</p>
        </button>
      </div>

      <ul
        class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6"
      >
        <li
          draggable="true"
          v-on:dragstart="dragstart_handler"
          v-for="feature in filteredFeatures"
          :id="feature.uid"
          :key="feature.uid"
          @click="$emit('view-feature', feature)"
          class="space-y-2 transition ease-in-out transform shadow-md  draggable duration-450 hover:scale-105 hover:shadow-xl md:max-w-md"
        >
          <div class="card-header">
            <div class="flex flex-row space-x-1">
              <span>{{ findEmoji(feature.status) }}</span>
              <p class="font-semibold">{{ feature.name }}</p>
            </div>
            <div class="flex flex-row items-baseline space-x-2">
              <p
                v-if="feature.mvp"
                class="text-xs font-semibold tracking-wide text-gray-500 uppercase "
              >
                MVP
              </p>
              <priority-indicator :class="feature.priority" />
            </div>
          </div>

          <p class="pb-12">{{ feature.description }}</p>
          <div class="card-footer">
            <!-- if has permission -->
            <!-- edit/delete button -->
            <div
              v-if="permission === true"
              class="flex flex-row items-center justify-end space-x-1"
            >
              <button
                type="button"
                class="edit"
                @click.stop="$emit('edit-feature', feature)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 text-gray-400 hover:text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import PriorityIndicator from "./PriorityIndicator.vue";
import FeatureDetailModal from "./FeatureDetailModal.vue";

export default {
  name: "FeatureBoard",
  components: { PriorityIndicator, FeatureDetailModal },
  data() {
    return {
      edit: "null",
      currentFeatures: [],
    };
  },
  props: ["features", "statusOptions", "filter", "permission"],

  methods: {
    ...mapActions(["authAction"]),
    dragstart_handler: function (event) {
      if (this.permission === true) {
        // Add the target element's id to the data transfer object
        event.dataTransfer.setData("text/plain", event.target.id);
      }
    },

    findEmoji: function (search) {
      let array = this.statusOptions;

      let result = array.filter((object) =>
        Object.keys(object).some((key) => object[key].includes(search))
      );

      return result[0].emoji;
    },
  },

  computed: {
    filteredFeatures() {
      if (this.filter === "All") {
        return this.features;
      } else {
        return this.features.filter((each) => each.status === this.filter);
      }
    },
  },
  // created() {
  //   this.setEventListener();
  //   console.log("mounted");
  // },
};
</script>

<style scoped>
/* relative flex flex-col w-full max-w-xl p-4 mx-auto space-y-2 text-left transition ease-in-out transform bg-white rounded-md shadow-md cursor-pointer  duration-450 hover:scale-105 hover:shadow-xl md:max-w-md */
li {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  margin-right: auto;
  margin-left: auto;
  text-align: left;
  background-color: #ffffff;
  cursor: pointer;
  border-radius: 0.375rem;
  max-width: 36rem;
}

/* flex-row items-baseline justify-between pb-4 */
.card-header {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  padding-bottom: 1rem;
}

/* absolute inset-x-0 bottom-0 p-2 bg-gray-100  rounded-br-md rounded-bl-md */
.card-footer {
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  padding: 1rem;
  /*border-bottom-right-radius: 0.375rem;
  border-bottom-left-radius: 0.375rem;
  background-color: #f3f4f6; */
}
</style>