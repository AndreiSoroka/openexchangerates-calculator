<template>
  <div
    v-if="selectedRates.length > 0"
    class="selected-table">
    <table class="table table-dark table-sm ">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Title</th>
        <th scope="col">Value</th>
      </tr>

      <tr
        v-for="(d,index) in data"
        :key="title+index">
        <th class="row">{{ index + 1 }}</th>
        <td>{{ d.title }}</td>
        <td>{{ d.value }}</td>
      </tr>
    </table>

  </div>
</template>

<style lang="scss">
  .selected-table {
    position: fixed;
    bottom: 0.3rem;
    z-index: 100;
    width: 700px;
    opacity: 0.3;
    overflow: hidden;
    border-radius: 0.3rem;

    &:hover{
      opacity: 0.95;
    }

    .table {
      margin-bottom: 0;
    }

    table td, table th {
      padding-left: 1rem;
    }

    .row {
      color: grey;
    }
  }

  @media (max-width: 850px) {
    .selected-table {
      width: 400px;
    }
  }

  @media (max-width: 650px) {
    .selected-table {
      width: 270px;
    }
  }
</style>

<script>
  import Big from "big.js";

  export default {
    components: {},
    props: {
      rates: {        // значение
        type: Object,
        default: () => {
        },
      },
      currentValue: {        // валюта
        type: String,
        default: '',
      },
      selectedRates: { // относительная единица
        type: Array,
        default: () => [],
      },
    },

    data() {
      return {};
    },

    computed: {
      data() {
        return this.selectedRates.map(title => {
          return {
            title,
            value: Big(this.rates[title]).mul(this.currentValue).round(10).toString()
          };
        });
      }
    },

    methods: {
      handlerChangeInput(el) {
        let value = Big(el.target.value).div(this.rate).toString();
        this.$emit('change', value);
      },

      handlerClickSelect() {
        if (!this.isSelected) {
          this.$emit('select', this.title);
        } else {
          this.$emit('unselect', this.title);
        }
      }
    }

  };
</script>
