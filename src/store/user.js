import axios from "axios";
import Vue from "vue";
import { SERVER_URL } from "./constants.js";

const state = {
  user: {
    // Datos del usuario logeado en la aplicacion
    id: null, username: null, email: null, token: null
  }
};

const mutations = {
  SET_USER(state, user) {
    Vue.set(state, "user", user);
    window.sessionStorage.setItem("_user", JSON.stringify(user));
  },
  SET_TOKEN(state, token) {
    Vue.set(state.user, "token", token);
  },
  SET_LOGIN_DETAILS(state, { username, email }) {
    Vue.set(state.user, "username", username);
    Vue.set(state.user, "email", email);
  },
};

const getters = {
  isLogged: (state) => () => {
    if (state.user.token !== null) {
      return true;
    }
    return false;
  },
  getToken: (state) => () => {
    return state.user.token;
  },
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
