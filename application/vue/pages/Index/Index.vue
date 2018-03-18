<template>
  <div>
    <h4>Калькулятор криптовалют</h4>

    <field
      v-for="(rate, title) in rates"
      :key="title"
      :rate="rate.toString()"
      :title="title"
      :current-value="currentValue.toString()"
      @change="handlerChangeField"
    />

  </div>
</template>

<style lang="scss">

</style>

<script>
  import {mapState} from 'vuex';
  import Field from './components/field/Field.vue';

  export default {
    components: {Field},
    data() {
      return {
        currentValue: '1'
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

      }
    }
  };
</script>
