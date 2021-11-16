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
};

const actions = {
  async init({ dispatch, commit, getters, rootGetters }) {
    // axios.defaults.headers.common["Authorization"] = getters.getAuthHeader();

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
