<template>
  <button :class="['my_btn',{
    danger: btn_type === 'd',
    warning: btn_type === 'w',
    success: btn_type === 's',
  }]">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-btn',
  props: {
    btn_type: { type: String },
  }
}
</script>

<style scoped>
.danger {
  border: 2px solid crimson;
}
.warning {
  border:2px solid orange;
  background-color: lightyellow;
  transition-duration: 1s;
}
.warning:hover {
  border: 2px solid goldenrod;
  border-radius: 30px;
  background-color: yellow;
  color: orangered;
}
.success {
  border:2px solid cyan;
  background-color: lightcyan;
  transition-duration: 1s;
}
.success:hover {
  border: 2px solid blue;
  border-radius: 30px;
  background-color: aqua;
  color: white;
}
.my_btn {
  padding: 4px 8px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px;
  font-style: italic;
}
</style>
