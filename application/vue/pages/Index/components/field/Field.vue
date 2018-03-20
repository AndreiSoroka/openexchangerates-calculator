<template>
  <div class="field">

    <div class="input-group mb-3">
      <input
        :value="value"
        type="number"
        class="form-control"
        @change="handlerChangeInput"
      >
      <div class="input-group-append">
        <span
          class="input-group-text">{{ title }}
        </span>
      </div>
      <div class="input-group-append">
        <button
          :class="{'btn-outline-secondary' : !isSelected, 'btn-secondary' : isSelected}"
          class="btn"
          @click="handlerClickSelect">Select
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
  export default {
    components: {},
    props: {
      value: {        // значение
        type: String,
        default: '',
      },
      title: {        // валюта
        type: String,
        default: '',
      },
      isSelected: { // поле выбрано
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {};
    },

    methods: {
      handlerChangeInput(el) {
        this.$emit('change', {
          value: el.target.value,
          title: this.title
        });
      },

      handlerClickSelect() {
        if (!this.isSelected) {
          this.$emit('select', this.title);
        } else {
          this.$emit('unselect', this.title);
        }
      },
    }

  };
</script>
