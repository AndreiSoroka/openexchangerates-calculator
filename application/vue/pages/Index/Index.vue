<template>
  <div class="index-page">
    <h4>Калькулятор криптовалют</h4>

    <selected-table
      :rates="rates"
      :current-value="currentValue.toString()"
      :selected-rates="selectedRates"
    />
    <div>{{ selectedRates }}</div>

    <div>
      <field
        v-for="(rate, title) in rates"
        :key="title"
        :rate="rate.toString()"
        :title="title"
        :current-value="currentValue.toString()"
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
  import {mapState} from 'vuex';
  import Field from './components/field/Field.vue';
  import SelectedTable from './components/selectedTable/SelectedTable.vue';

  export default {
    components: {Field, SelectedTable},
    data() {
      return {
        currentValue: '1',
        selectedRates: []
      };
    },

    computed: {
      ...mapState({
        // currentValue: s => s.currentValue,
        // base: s => s.base,
        rates: s => s.rates,
      })
    },

    methods: {
      handlerChangeField(value) {
        this.currentValue = value;
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
    }
  };
</script>
