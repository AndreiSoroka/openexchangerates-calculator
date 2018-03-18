<template>
  <div>
    <h4>Калькулятор криптовалют</h4>

    <field
      v-for="(rate, title) in rates"
      :key="title"
      :rate="rate.toString()"
      :title="title"
      :current-value="currentValue.toString()"
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
      return {};
    },

    computed: {
      ...mapState({
        currentValue: s => s.currentValue,
        base: s => s.base,
        rates: s => s.rates,
      })
    },
  };
</script>
