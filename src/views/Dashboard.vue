<template>
  <b-col cols="12">
    <b-row class="mb-1 widget"> </b-row>
    <b-row class="mb-1 widget"> </b-row>
    <b-row class="mb-1 widget"> </b-row>
  </b-col>
</template>

<script>
import { mapGetters } from "vuex";
const components = {};
const methods = {};

const computed = {
  ...mapGetters({}),
  date: function () {
    return this.dateToString(new Date());
  },
};
export default {
  methods,
  components,
  computed,
};
</script>
