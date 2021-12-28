<template>
  <div id="app" class="h-auto min-h-screen bg-gray-50">
    <router-view />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["authAction", "signOutAction"]),
    // signOut: function () {
    //   this.signOutAction();
    //   this.$router.push({ name: "Login" });
    // },
  },
  mounted() {
    this.authAction();
  },
  // computed: {
  //   ...mapGetters(["getUser", "isUserAuth"]),
  // },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 320px;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.hidden-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.hidden-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.button-text {
  font-size: 0.75rem;
  line-height: 1rem;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.025em;
  min-width: max-content;
}

.modal-background {
  /* fixed top-0 z-50 w-full h-full py-16 overflow-y-auto  */
  position: fixed;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 50;
  padding-top: 4rem;
  padding-bottom: 4rem;
  overflow-y: auto;
}
.modal-foreground {
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 50;
  height: auto;
  max-width: 32rem;
  margin-right: auto;
  margin-left: auto;
  padding: 2rem;
  border-width: 1px;
  border-radius: 0.5rem;
  text-align: left;
}
.btn {
  /*"px-4 py-2 text-sm font-semibold border rounded-md tracking-wide " */
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-width: 1px;
  border-radius: 0.375rem;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.25rem;
  letter-spacing: 0.025rem;
}
</style>
