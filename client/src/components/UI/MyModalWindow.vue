<template>
  <div v-if="modelValue" @click="updateModelValue(false)" class="modal-wrapper">
    <div @click.stop class="modal-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {updateModelValMixin} from "@/components/mixins/updateModelValMixin";

export default {
  name: 'my-modal-window',
  mixins: [updateModelValMixin],
}
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(6, 6, 6, 0.5);
}
.modal-content {
  min-width: 300px;
  min-height: 200px;
  background-color: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
}
</style>