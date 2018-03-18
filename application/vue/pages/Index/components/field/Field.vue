<template>
  <div class="field">

    <div class="input-group mb-3">
      <input
        :value="value"
        type="number"
        class="form-control"
      >
      <div class="input-group-append">
        <span
          class="input-group-text">{{ title }}
        </span>
      </div>
      <div class="input-group-append">
        <button
          class="btn btn-outline-secondary">Select
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .field {
    margin: 1rem 0;
    .input-group-text {
      min-width: 4rem;
    }
  }
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

        // целое число
        if (rateFloatLength + currentValueFloatLength === 0) {
          return value;
        }

        let position = value.length - (rateFloatLength + currentValueFloatLength);

        // целая часть нулевая
        if (position <= 0) {
          value = Array(-position + 1).fill(0).join('') + value; // добавляем нули в начало
          position = 1;
        }

        return value.substr(0, position) + '.' + value.substr(position, value.length);
      }
    },

  };
</script>
