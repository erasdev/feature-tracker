<template>
  <projects-list />
</template>

<script>
import ProjectsList from "@/components/ProjectsList.vue";
import store from "@/store";
export default {
  name: "Projects",
  components: { ProjectsList },
  mounted() {
    this.$store.dispatch("bindProjectList");
  },
  beforeRouteLeave(to, from, next) {
    // unbind everything to reset state
    // will bind again with appropriate data on entering new route/rerendering the component
    // good housekeeping
    store.dispatch("unbindProjectList");
    next();
  },
};
</script>

<style>
</style>