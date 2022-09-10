<template>
  <div @click="hideModal" :class='{wrapper: true, active: modelValue}'>
    <div  class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'img-modal',
  props: {
    modelValue: { type: Boolean, default: false },
  },
  methods: {
    hideModal() {
      this.$emit('update:modelValue', false);
    }
  }
}
</script>

<style scoped>
.wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
}

.content {
  max-height: 80%;
  max-width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.active {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>