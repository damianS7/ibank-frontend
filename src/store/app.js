import axios from "axios";
import Vue from "vue";
import { SERVER_URL } from "./constants.js";

const state = {
  // Flag que determina si la app esta lista, es decir, login + inicializacion de datos.
  appReady: false,
};

const mutations = {
  SET_READY(state, ready) {
    Vue.set(state, "appReady", ready);
  },
};

const getters = {
  isAppReady: (state) => () => {
    return state.appReady;
  },
  getAuthHeader: (state, getters, rootState, rootGetters) => () => {
    return "Bearer " + rootGetters["user/getToken"]();
  },
  dateToString: () => (date) => {
    return date.toISOString().split('T')[0];
  },
};

const actions = {
  async tokenValidation() {
    // Comprobamos que el token sea valido
    return await axios.get(SERVER_URL + "/api/v1/users/tokenvalidation").then(function (response) {
      return response;
    }).catch(function (error) {
      return error.response;
    });
  },
  async init({ dispatch, commit, getters, rootGetters }) {
    axios.defaults.headers.common["Authorization"] = getters.getAuthHeader();

    // Obtenemos los ingredientes disponibles
    const response = await axios.get(SERVER_URL + "/api/v1/ingredients")
      .then(function (response) {
      let ingredients = {};
      response.data.forEach((ingredient) => {
        ingredient.kcals = rootGetters["ingredient/ingredientKcals"](ingredient);
        ingredients[ingredient.id] = ingredient;
      });
      
      commit("ingredient/SET_INGREDIENTS", ingredients, { root: true });
      return response;
    }).catch(function (error){
      return error.response;
    });

    // Comprobamos solo la primera response para ver si se puede conectar al servidor etc ...
    if (typeof response === "undefined" || response.status != 200) {
      // Si no hay respuesta, no se puede conectar al servidor ...
      // console.log("server unreacheble");

      // En caso de estar logeados, destruimos la session
      await dispatch("user/logout", null, { root: true });

      // No se avanza mas ...
      return;
    }

    // Profile
    // await axios.get(SERVER_URL + "/api/v1/user/profile").then(function (response) {
    //   if (response.status == 200) {
    //     commit("profile/SET_PROFILE", response.data, { root: true });
    //   }
    // });

    await new Promise((r) => setTimeout(r, 1000));
    commit("SET_READY", true);
  },
  async confirmDialog(context, { vm, msg }) {
    return await vm.$bvModal.msgBoxConfirm(msg, {
      size: "sm",
      buttonSize: "sm",
      okVariant: "danger",
      okTitle: "YES",
      cancelTitle: "NO",
      hideHeaderClose: true,
      centered: true,
    });
  },
  async makeToast(context, { vm, msg, title, variant = "danger" }) {
    vm.$bvToast.toast(msg, {
      title: title,
      autoHideDelay: 5000,
      appendToast: false,
      solid: true,
      toaster: "b-toaster-bottom-right",
      variant: variant,
    });
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true,
};
