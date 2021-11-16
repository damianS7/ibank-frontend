// import axios from "axios";
import Vue from "vue";
// import { SERVER_URL } from "./constants.js";

const state = {
  user: {
    // Datos del usuario logeado en la aplicacion
    id: null, username: null, email: null, token: null
  }
};

const mutations = {
  SET_USER(state, user) {
    Vue.set(state, "user", user);
  },
};

const getters = {
  getUser() {
    return state.user;
  }
};

const actions = {
  
};

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true,
};
