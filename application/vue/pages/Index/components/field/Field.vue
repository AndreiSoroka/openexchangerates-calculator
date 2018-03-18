<template>
  <div>

    <div class="input-group mb-3">
      <input
        :value="value"
        type="text"
        class="form-control"
      >
      <div class="input-group-append">
        <span
          id="basic-addon2"
          class="input-group-text">{{ title }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

</style>

<script>
  import bigInt from "big-integer";

  export default {
    components: {},
    props: {
      rate: {        // значение
        type: String,
        default: '',
      },
      title: {        // валюта
        type: String,
        default: '',
      },
      currentValue: { // относительная единица
        type: String,
        default: '',
      },
    },

    data() {
      return {};
    },

    computed: {
      // значение
      value() {
        let rate = this.rate.replace('.', '');
        let rateFloatLength = (this.rate.includes('.'))
          ? this.rate.length - this.rate.indexOf('.') - 1 :
          0;

        let currentValue = this.currentValue.replace('.', '');
        let currentValueFloatLength = (this.currentValue.includes('.'))
          ? this.currentValue.length - this.currentValue.indexOf('.') - 1
          : 0;

        // todo if (value.isSmall){...}
        let value = bigInt(rate).multiply(currentValue).toString();

        let a = value.length - (rateFloatLength + currentValueFloatLength);

        return value.substr(0, a) + '.' + value.substr(a, value.length);
      }
    },

  };
</script>
