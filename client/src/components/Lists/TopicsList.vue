<template>
  <div class="topics-list">
    <topics-list-item v-for="topic in topics" :topic="topic"/>
  </div>
</template>

<script>
import TopicsListItem from "@/components/TopicsListItem";

export default {
  components: {TopicsListItem},
  props: {
    topics: { type: Array, required: true },
  }
}



</script>

<style scoped>
.topics-list {
  text-align: center;
}
</style>