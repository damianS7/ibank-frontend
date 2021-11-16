import Vue from "vue";
import Vuex from "vuex";
import security from "./security";
import app from "./app";

Vue.use(Vuex);

const modules = {
  app, security
};

export default new Vuex.Store({
  modules
});