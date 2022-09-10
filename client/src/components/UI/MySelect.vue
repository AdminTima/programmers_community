<template>
  <select required :value="modelValue" @change="updateModelValue" class="my-select">
    <option value="" disabled>{{ defaultVal ? defaultVal : 'Select option' }}</option>
    <option
        v-for="option in options"
        :key="option.name"
        :value="option[val]">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
import {updateModelValMixin} from "@/components/mixins/updateModelValMixin";

export default {
  name:'my-select',
  mixins: [updateModelValMixin],
  props: {
    options: { type: Array, required: true },
    val: { type: String, required: true },
    defaultVal: { type: String },
  }
}
</script>

<style scoped>
.my-select {
  border: 2px solid lightseagreen;
  border-radius: 10px;
  padding: 3px 8px;
}
</style>