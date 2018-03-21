<template>
  <div class="index-page">
    <h4>Crypto-currency calculator</h4>
    <div v-if="base">Calculation relative to: {{ base }}</div>
    <div>Source code:
      <a
        href="https://github.com/AndreiSoroka/openexchangerates-calculator"
        target="_blank">AndreiSoroka/openexchangerates-calculator</a>
    </div>
    <div v-if="license">License:
      <a
        :href="license"
        target="_blank"
      >{{ license }}</a>
    </div>

    <div class="index-page__update">
      Last updated: {{ updateDate.format }} ({{ updateDate.fromNow }})
      <button
        v-if="isLoading"
        class="btn btn-secondary btn-sm index-page__update-button"
      >Loading
      </button>
      <button
        v-else
        class="btn btn-outline-success btn-sm index-page__update-button"
        @click="handlerUpdateDataServer"
      >Update
      </button>
      (maximum 1 time per hour)

      <div
        v-if="error"
        class="alert alert-danger">
        <span v-if="error.name==='NOT_GET_DATA'">
          Could not get data from the server
          <a
            href="https://openexchangerates.org/"
            target="_blank">openexchangerates.org</a>
        </span>
        <span v-else>{{ error.name }}</span>
      </div>
    </div>

    <filters v-model="filter"/>

    <selected-table
      :rates="currentRates"
      :current-value="currentValue.toString()"
      :selected-rates="selectedRates"
      @unselect="handlerUnselect"
    />

    <div>
      <div v-if="!filterRates.length && isLoading">Loading...</div>
      <div v-else-if="!filterRates.length && !filter">Data not loaded</div>
      <div v-else-if="!filterRates.length">Nothing was found for the specified filters.</div>
      <field
        v-for="({value, title}) in filterRates"
        :key="title"
        :id="title"
        :value="value.toString()"
        :title="title"
        :is-selected="selectedRates.includes(title)"
        @change="handlerChangeField"
        @select="handlerSelect"
        @unselect="handlerUnselect"
      />
    </div>

    <div class="index-page__footer"></div>

  </div>
</template>

<style lang="scss">
  .index-page__footer {
    height: 180px;
  }

  .index-page__update {
    margin: 1rem 0;
  }

  .index-page__update-button {
    margin: 0 0.5rem;
    min-width: 5rem;
  }
</style>

<script>
  import {mapState, mapActions} from 'vuex';
  import Field from './components/field/Field.vue';
  import Filters from './components/filters/Filters.vue';
  import SelectedTable from './components/selectedTable/SelectedTable.vue';
  import Big from "big.js";
  import moment from "moment";

  Big.DP = 300;
  Big.PE = 1000;

  export default {
    components: {Field, SelectedTable, Filters},
    data() {
      return {
        currentValue: '1',
        selectedRates: [],
        filter: ''
      };
    },

    computed: {
      currentRates() {
        let rates = Object.assign({}, this.rates);
        for (let key in rates) {
          let round = (key === 'BTC') ? 8 : 4;
          rates[key] = Big(this.rates[key]).mul(this.currentValue).round(round).toString();
        }

        return rates;
      },

      filterRates() {
        return Object.keys(this.currentRates)
          .filter(title => title.includes(this.filter.toUpperCase()))
          .map(title => ({title, value: this.currentRates[title]}));

      },
      updateDate() {
        let date = moment(this.timestamp * 1000);
        return {
          format: date.format('DD MMMM YYYY H:mm:ss'),
          fromNow: date.fromNow()
        };
      },

      ...mapState({
        license: s => s.license,
        timestamp: s => s.timestamp,
        base: s => s.base,
        rates: s => s.rates,
        error: s => s.error,
        isLoading: s => s.isLoading,
      })
    },

    created() {
      this.getDataServer();
    },

    methods: {
      handlerChangeField({value, title}) {
        this.currentValue = Big(value).div(this.rates[title]).toString();
      },

      handlerSelect(id) {
        if (this.selectedRates.includes(id)) {
          return;
        }
        this.selectedRates.unshift(id);
        this.selectedRates.splice(5);
      },

      handlerUnselect(id) {
        let positionId = this.selectedRates.indexOf(id);
        if (positionId !== -1) {
          return this.selectedRates.splice(positionId, 1);
        }
      },

      handlerUpdateDataServer() {
        this.getDataServer();
      },

      ...mapActions({
        getDataServer: 'getData'
      })
    }
  };
</script>
