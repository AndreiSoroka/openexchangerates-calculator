<template>
  <div>
    <h4>Калькулятор криптовалют</h4>

    <field
      v-for="(value, title) in rates"
      :key="title"
      :value="value.toString()"
      :title="title"
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
        rates: s => s.rates
      })
    },
  };
</script>
