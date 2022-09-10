<template>
  <div class="topic-list-item">
    <p class="topic-name">{{ topic.name }}</p>
  </div>
</template>

<script>
export default {
  props: {
    topic: { type: Object, required: true },
  }
}
</script>

<style scoped>
.topic-list-item {
  margin-bottom: 15px;
  border-bottom: 3px solid lime;
  border-left: 2px solid lime;
  border-right: 2px solid lime;
  border-top: 1px solid lime;
  border-radius: 5px;
}
.topic-name {
  font-size: 24px;
  font-weight: bold;
  color: blue;
}
</style>