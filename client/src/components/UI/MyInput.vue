<template>
  <input :value="modelValue" @input="updateModelValue($event.target.value)" />
</template>

<script>
import {updateModelValMixin} from "@/components/mixins/updateModelValMixin";

export default {
name: 'my-input',
  mixins: [updateModelValMixin]
}
</script>

<style scoped>
input {
  border: 2px solid lightseagreen;
  border-radius: 20px;
  outline: none;
  padding: 2px 4px;
  text-align: center;
  font-size: 20px;
}
</style>