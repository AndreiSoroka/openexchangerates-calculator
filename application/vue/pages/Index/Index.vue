<template>
  <div class="index-page">
    <h4>Калькулятор криптовалют</h4>
    <p>Расчет относительно: {{ base }}</p>
    <p>
      Последнее обновление: {{ updateDate.format }} ({{ updateDate.fromNow }})
      <button
        class="btn btn-outline-success btn-sm"
        @click="handlerUpdateDataServer"
      >Обновить
      </button>
    </p>

    <selected-table
      :rates="currentRates"
      :current-value="currentValue.toString()"
      :selected-rates="selectedRates"
      @unselect="handlerUnselect"
    />

    <div>
      <field
        v-for="(value, title) in currentRates"
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
</style>

<script>
  import {mapState, mapActions} from 'vuex';
  import Field from './components/field/Field.vue';
  import SelectedTable from './components/selectedTable/SelectedTable.vue';
  import Big from "big.js";
  import moment from "moment";

  export default {
    components: {Field, SelectedTable},
    data() {
      return {
        currentValue: '1',
        selectedRates: []
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

      updateDate() {
        let date = moment(this.timestamp * 1000);
        return {
          format: date.format('DD MMMM YYYY H:mm:ss'),
          fromNow: date.fromNow()
        };
      },

      ...mapState({
        timestamp: s => s.timestamp,
        base: s => s.base,
        rates: s => s.rates,
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
