import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  "isLoading": false,
  "disclaimer": "",
  "license": "",
  "timestamp": 1521392406,
  "base": "",
  "rates": {},
  "error": null,
};
const mutations = {
  SET_DATA(state, {disclaimer = '', license = '', timestamp, base = '', rates = {}, error = null}) {
    state.disclaimer = disclaimer;
    state.license = license;
    state.timestamp = timestamp;
    state.base = base;
    state.rates = rates;
    state.error = error;
  },

  SET_STATUS_LOADING(state,status) {
    state.isLoading = status;
  }
};

const actions = {
  async getData({commit}) {
    commit('SET_STATUS_LOADING', true);
    let getData = await fetch('/api/getData');
    let data = await getData.json();

    commit('SET_DATA', data);
    commit('SET_STATUS_LOADING', false);
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
