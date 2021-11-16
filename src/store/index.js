import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import app from "./app";
import security from "./security";

Vue.use(Vuex);

const state = {
};

const mutations = {
};

const getters = {
};

const actions = {
  
};

const modules = {
  app, user, security
};

export default new Vuex.Store({
  modules,
  state,
  mutations,
  getters,
  actions,
  namespaced: true,
});