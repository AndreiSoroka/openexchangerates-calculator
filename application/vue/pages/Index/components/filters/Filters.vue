<template>
  <div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span
          class="input-group-text">Фильтр:
        </span>
      </div>
      <input
        ref="input"
        :value="value"
        class="form-control"
        maxlength="3"
        @input="handlerUpdateValue($event.target.value)"
      />
      <div class="input-group-append">
        <button
          class="btn btn-outline-secondary"
          @click="handlerClearValue">Очистить
        </button>
      </div>
    </div>

  </div>
</template>

<style lang="scss">
</style>

<script>
  export default {
    components: {},
    props: {
      value: {        // значение
        type: String,
        default: '',
      },
    },

    data() {
      return {};
    },

    methods: {
      handlerUpdateValue: function (value) {
        this.$emit('input', value.trim());
      },

      handlerClearValue(){
        this.$emit('input', '');
      }
    }

  };
</script>
