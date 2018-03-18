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
    },
    data() {
      return {};
    },
  };
</script>
