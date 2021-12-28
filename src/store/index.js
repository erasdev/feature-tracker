import Vue from "vue";
import Vuex, { Store } from "vuex";
import router from "@/router";

import firebase from "firebase/app";
import "firebase/auth";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import { db } from "../db";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    error: null,
    firebaseFeatures: null,
    firebaseProject: [],
    firebaseProjectList: [],
  },
  mutations: {
    //other mutations
    ...vuexfireMutations,
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    reset(state) {
      state.firebaseFeatures = null;
      state.firebaseProject = null;
      state.firebaseProjects = null;
    },
  },
  actions: {
    authAction({ commit }) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          commit("setUser", user);
        } else {
          commit("setUser", null);
        }
      });
    },
    signUpAction({ commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          db.collection("users")
            .doc(user.user.uid)
            .set({
              username: payload.username,
              email: payload.email,
            });
        })
        .catch((error) => {
          commit("setError", error.message);
        });
    },
    signInAction({ commit }, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .catch((error) => {
          commit("setError", error.message);
        });
    },
    signOutAction({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit("setUser", null);
        })
        .catch((error) => {
          commit("setError", error.message);
        });
    },
    bindFeatures: firestoreAction((context) => {
      const username = router.currentRoute.params.user;
      const projectKebab = router.currentRoute.params.project;
      const projectString = projectKebab
        .split("-")
        .map((word) => {
          return word.slice(0, 1).toUpperCase() + word.slice(1);
        })
        .join(" ");

      const usernameRef = db.collection("users").where("username", "==", username);
      usernameRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const userId = doc.id;

          const projectRef = db.collection("projects").where("name", "==", projectString);
          projectRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const projectUID = doc.data().uid;

              // return the promise returned by `bindFirestoreRef`
              return context.bindFirestoreRef(
                "firebaseFeatures",
                db
                  .collection("features")
                  .where("owner", "==", userId)
                  .where("project", "==", projectUID)
              );
            });
          });
        });
      });
    }),

    bindProject: firestoreAction((context) => {
      const username = router.currentRoute.params.user;
      const projectKebab = router.currentRoute.params.project;
      const projectString = projectKebab
        .split("-")
        .map((word) => {
          return word.slice(0, 1).toUpperCase() + word.slice(1);
        })
        .join(" ");

      const usernameRef = db.collection("users").where("username", "==", username);
      usernameRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const userId = doc.id;

          const projectRef = db.collection("projects").where("name", "==", projectString);
          projectRef.get().then((querySnapshot) => {
            if (querySnapshot.empty != true) {
              querySnapshot.forEach((doc) => {
                const projectUID = doc.data().uid;

                // return the promise returned by `bindFirestoreRef`
                return context.bindFirestoreRef(
                  "firebaseProject",
                  db
                    .collection("projects")
                    .where("owner", "==", userId)
                    .where("uid", "==", projectUID)
                );
              });
            } else {
              console.log("Nope");
              router.push({ name: "NotFound" });
            }
          });
        });
      });
    }),
    bindProjectList: firestoreAction((context) => {
      const username = router.currentRoute.params.user;

      //gets doc containing username from route params
      const usernameRef = db.collection("users").where("username", "==", username);

      usernameRef.get().then((querySnapshot) => {
        if (querySnapshot.empty != true) {
          querySnapshot.forEach((doc) => {
            const userId = doc.id;

            // return the promise returned by `bindFirestoreRef`
            return context.bindFirestoreRef(
              "firebaseProjectList",
              db.collection("projects").where("owner", "==", userId)
            );
          });
        } else {
          console.log("Nope");
          router.push({ name: "NotFound" });
        }
      });
    }),
    unbindFeatures: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef("firebaseFeatures");
    }),
    unbindProject: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef("firebaseProject");
    }),
    unbindProjectList: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef("firebaseProjectList");
    }),
  },
  modules: {},
  getters: {
    firebaseFeatures: (state) => {
      return state.firebaseFeatures;
    },
    firebaseProject: (state) => {
      return state.firebaseProject;
    },
    firebaseProject: (state) => {
      return state.firebaseProjects;
    },
    getUser(state) {
      return state.user;
    },
    isUserAuth(state) {
      return !!state.user;
    },
  },
});
