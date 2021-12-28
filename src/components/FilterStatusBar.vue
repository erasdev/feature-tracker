<template>
  <div
    class="flex flex-row items-baseline justify-between gap-4 px-4 overflow-x-auto  hidden-scrollbar md:px-6"
  >
    <ul class="flex flex-row gap-4 md:gap-6 filterbar">
      <li v-for="(status, index) in this.statusOptions" :key="index">
        <input
          type="radio"
          :id="index"
          name="filterbar"
          :value="status.label"
          hidden
        />
        <label
          v-on:drop.prevent="drop_handler"
          v-on:dragover.prevent
          :id="status.label"
          :for="index"
          @click="$emit('set-filter', status)"
          class="flex flex-row items-center p-2 space-x-1 text-sm font-semibold tracking-wide text-gray-500 uppercase border-b-2 border-transparent cursor-pointer  min-w-max md:px-4 hover:border-gray-400"
          ><p class="pointer-events-none">
            {{ status.emoji }}
            <span class="hidden md:inline">{{ status.label }}</span>
          </p>
          <span
            v-if="statusCount[status.label]"
            class="px-2 py-1 text-xs text-gray-400 bg-gray-100 rounded-full pointer-events-none "
            >{{ statusCount[status.label] }}</span
          >
          <span
            v-else
            class="px-2 py-1 text-xs text-gray-400 bg-gray-100 rounded-full pointer-events-none "
            >0</span
          >
        </label>
      </li>

      <li>
        <input
          type="radio"
          name="filterbar"
          id="viewAll"
          value="viewAll"
          hidden
          checked
        />
        <label
          for="viewAll"
          id="all"
          @click="$emit('set-filter', 'All')"
          class="flex flex-row items-center px-2 py-2 space-x-1 text-sm font-semibold tracking-wide text-gray-500 uppercase border-b-2 border-transparent cursor-pointer  min-w-max md:px-4 hover:border-gray-400"
          ><p class="pointer-events-none">
            👀
            <span class="hidden md:inline">All</span>
          </p>

          <span
            v-if="this.featuresCount != 0"
            class="px-2 py-1 text-xs text-gray-400 bg-gray-100 rounded-full pointer-events-none "
            >{{ featuresCount }}</span
          >
          <span
            v-else
            class="px-2 py-1 text-xs text-gray-400 bg-gray-100 rounded-full pointer-events-none "
            >0</span
          ></label
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { db } from "../db.js";
export default {
  name: "FilterStatusBar",

  data() {
    return {};
  },
  props: ["statusOptions", "statusCount", "featuresCount"],
  methods: {
    drop_handler: function (event) {
      // Retrieve data from transfer object
      const data = event.dataTransfer.getData("text/plain");

      // Get id of drop zone
      const target = event.target.id;

      const documents = db.collection("features").where("uid", "==", data);

      // Update feature status
      documents.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const docRef = doc.id;
          return db.collection("features").doc(docRef).update({
            status: target,
          });
        });
      });
    },
  },
};
</script>

<style scoped>
input:checked + label {
  border-color: #6b7280;
}
input:checked:hover + label:hover {
  border-color: #6b7280;
}
</style>