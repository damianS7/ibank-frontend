<template>
  <b-container id="app" class="w-100 h-100">
    <b-row
      v-if="isLogged() && appReady()"
      align-v="center"
      class="justify-content-center h-100 p-3"
    >
      <b-col cols="12" md="10" lg="6" class="side">
        <b-row align-v="center" class="header">
          <header-component></header-component>
        </b-row>
        <b-row align-v="start" class="content">
          <router-view></router-view>
        </b-row>
        <b-row align-v="center" class="footer text-center">
          <footer-component></footer-component>
        </b-row>
      </b-col>
    </b-row>

    <b-row
      v-if="isLogged() && !appReady()"
      align-v="center"
      class="h-100 w-100"
    >
      <b-col cols="12">
        <b-overlay show rounded="sm"> </b-overlay>
      </b-col>
    </b-row>

    <b-row v-if="!isLogged()" align-v="center" class="w-100 h-100">
      <login></login>
    </b-row>
  </b-container>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import Login from "@/views/Login.vue";
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
import Dashboard from "@/views/Dashboard.vue";

const components = {
  Login,
  dashboard: Dashboard,
  "header-component": Header,
  "footer-component": Footer,
};
const methods = {};
const computed = {
  ...mapState({
    user: "user",
  }),
  ...mapGetters({
    isLogged: "security/isLogged",
    appReady: "app/isAppReady",
  }),
};

const mounted = async function () {};

export default { components, methods, computed, mounted };
</script>
<style>
@media (max-width: 544px) {
  * {
    font-size: 0.9rem;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html,
body {
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.header,
.content,
.footer,
.sidebar {
  background: #eeef;
}

.header,
.content,
.footer {
  padding: 5px 12px;
  margin: 0;
}

.footer {
  height: 60px;
  border-top: 1px solid black;
}

.content {
  height: calc(100% - 120px);
  overflow-y: auto;
  overflow-x: hidden;
  word-break: break-all;
  margin: 0;
}

.content .widget {
  background: #fff;
  padding: 10px 0;
  border-radius: 0.25rem !important;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}

:link,
:visited {
  text-decoration: none;
  color: #212529;
}
</style>





