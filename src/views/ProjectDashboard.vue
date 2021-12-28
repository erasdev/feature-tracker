<template>
  <div v-if="project != null">
    <top-navigation-bar :name="project.name" :permission="permission" />
    <div
      class="flex flex-row items-center justify-center gap-6 pt-2 bg-white border-b border-gray-300 "
    >
      <filter-status-bar
        :statusOptions="project.status_options"
        :statusCount="statusCount"
        :featuresCount="featuresCount"
        v-on:set-filter="setFilter"
      />
    </div>

    <feature-board
      :features="features"
      :statusOptions="project.status_options"
      :filter="filter"
      v-on:edit-feature="openEdit"
      v-on:view-feature="openView"
      v-on:add-feature="openAdd"
      :permission="permission"
    />
    <feature-detail-modal
      :statusOptions="project.status_options"
      v-if="this.edit != null || this.view != null || this.add === true"
      v-bind:edit="edit"
      v-bind:view="view"
      v-bind:add="add"
      v-bind:projectUID="project.uid"
      v-on:close-modal="closeModal"
    />
  </div>
</template>

<script>
import TopNavigationBar from "@/components/TopNavigationBar.vue";
import FeatureBoard from "../components/FeatureBoard.vue";
import FilterStatusBar from "@/components/FilterStatusBar.vue";
import FeatureDetailModal from "@/components/FeatureDetailModal.vue";
import store from "@/store";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "ProjectDashboard",
  components: {
    TopNavigationBar,
    FeatureBoard,
    FilterStatusBar,
    FeatureDetailModal,
  },
  data() {
    return {
      edit: null,
      view: null,
      add: false,
      filter: "All",
    };
  },

  computed: {
    permission: function () {
      return (
        this.$store.state.user != null &&
        firebase.auth().currentUser.uid === this.project.owner
      );
    },
    statusCount: function () {
      return this.features.reduce((count, feature) => {
        count[feature.status] = count[feature.status] || 0;
        count[feature.status]++;

        return count;
      }, {});
    },
    featuresCount: function () {
      return this.features.length;
    },
    features: function () {
      return this.$store.state.firebaseFeatures;
    },
    project: function () {
      return this.$store.state.firebaseProject[0];
    },
  },
  methods: {
    openEdit: function (feature) {
      this.edit = feature;
      this.view = null;
      this.add = false;
    },
    openView: function (feature) {
      this.view = feature;
      this.edit = null;
      this.add = false;
    },
    openAdd: function () {
      this.add = !this.add;
      this.edit = null;
      this.view = null;
    },
    closeModal: function () {
      this.edit = null;
      this.view = null;
      this.add = false;
    },
    setFilter: function (payload) {
      if (payload === "All") {
        this.filter = "All";
      } else {
        this.filter = payload.label;
      }
    },
  },

  created() {
    this.$store.dispatch("bindFeatures");
    this.$store.dispatch("bindProject");
  },

  beforeRouteLeave(to, from, next) {
    // unbind everything to reset state
    // will bind again with appropriate data on entering new route/rerendering the component
    // good housekeeping
    store.dispatch("unbindFeatures");
    store.dispatch("unbindProject");
    next();
  },
};
</script>

<style>
</style>