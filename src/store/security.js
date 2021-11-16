// import axios from "axios";
import Vue from "vue";
// import { SERVER_URL } from "./constants.js";

const state = {
  token: null
};

const mutations = {
  SET_TOKEN(state, token) {
    Vue.set(state, "token", token);
  },
};

const getters = {
  isLogged: (state) => () => {
    if (state.token !== null) {
      return true;
    }
    return false;
  },
  getToken: (state) => () => {
    return state.token;
  },
};

const actions = {
  async tokenValidation() {
    // Comprobamos que el token sea valido
    return { data: "", status: 200 }
  },
  async login({ commit }, { username, password }) {
    commit("user/SET_USER", {id: 1, username, email: "demo@gmail.com", token: password}, { root: true });
    commit("SET_TOKEN", password);
    return { status: 200 };
    // commit("SET_TOKEN", password)
    // window.sessionStorage.setItem("_token", JSON.stringify(password));
    // return await axios
    //   .post(SERVER_URL + "/api/v1/users/login", { username, password })
    //   .then(function (response) {
    //     if(response.status == 200) {
    //       commit("user/SET_USER", response.data);
    //       commit("SET_TOKEN", response.data.token)
    //       window.sessionStorage.setItem("_token", JSON.stringify(response.data.token));
    //     }
    //     return response;
    //   })
    //   .catch(function (error) {
    //     // Si no se puede alcanzar el servidor ...
    //     // Ponemos el codigo y mensaje nosotros ya que si no estara vacio.
    //     if (typeof error.response === "undefined") {
    //       return {
    //         status: -1,
    //         data: "Network error",
    //       };
    //     }
    //     return error.response;
    //   });
  },
  async logout({ commit }) {
    window.sessionStorage.removeItem('_token');
    commit("SET_TOKEN", null);
    commit("app/SET_READY", false, { root: true });
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true,
};
