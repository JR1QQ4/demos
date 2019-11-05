import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    filters: {
      types: "全部类型",
      areas: "全部地区",
      years: "全部年代"
    }
  },
  mutations: {
    changetype(state, payload) {
      state.filters.types = payload.type;
    },
    changearea(state, payload) {
      state.filters.areas = payload.area;
    },
    changeyear(state, payload) {
      state.filters.years = payload.year;
    }
  },
  actions: {},
  modules: {}
});
