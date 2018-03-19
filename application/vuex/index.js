import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  "isLoading": false,
  "disclaimer": "",
  "license": "",
  "timestamp": 1521392406,
  "base": "",
  "rates": {}
};
const mutations = {
  SET_DATA(state, {disclaimer, license, timestamp, base, rates}) {
    state.disclaimer = disclaimer;
    state.license = license;
    state.timestamp = timestamp;
    state.base = base;
    state.rates = rates;
  }
};

const actions = {
  async getData({commit}) {
    let getData = await fetch('/api/getData');
    let data = await getData.json();

    commit('SET_DATA', data);
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
