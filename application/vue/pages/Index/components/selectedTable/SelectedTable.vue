<template>
  <div
    v-if="selectedRates.length > 0"
    class="selected-table">
    <table class="table table-dark table-sm ">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Title</th>
        <th scope="col">Value</th>
        <th scope="col">Actions</th>
      </tr>

      <tr
        v-for="(d,index) in data"
        :key="d.title+index">
        <th class="row">{{ index + 1 }}</th>
        <td>{{ d.title }}</td>
        <td>{{ d.value }}</td>
        <td>
          <a
            v-smooth-scroll
            :href="'#'+d.title"
            class="selected-table__action"
            @mousedown="handlerClearFilters">Go to</a>
          <span
            class="selected-table__action"
            @click="handlerClickRemove(d.title)">Remove</span>
        </td>
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
    opacity: 0.9;
    overflow: hidden;
    border-radius: 0.3rem;

    &:hover {
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

  .selected-table__action {
    cursor: pointer;
    color: #fff;
    margin: 0 1rem 0 0;

    &:hover {
      color: #fff;
      text-decoration: underline;
    }
  }
</style>

<script>
  export default {
    components: {},
    props: {
      rates: {        // значения всех валют
        type: Object,
        default: () => {
        },
      },
      selectedRates: { // выбранные валюты
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
            value: this.rates[title]
          };
        });
      },
    },
    methods: {
      handlerClickRemove(title) {
        this.$emit('unselect', title);
      },

      handlerClearFilters() {
        this.$emit('clearFilters', true);
      },
    },
  };
</script>
