<template>
  <h2 v-if="!rooms.length">No rooms yet. But you can create one.</h2>
  <div v-else class="rooms-list">
    <rooms-list-item  v-for="room in rooms" :room="room"/>
  </div>
</template>

<script>
import RoomsListItem from "@/components/RoomsListItem";

export default {
  components: {RoomsListItem},
  props: {
    rooms: { type: Array, required: true },

  }
}
</script>

<style scoped>
.rooms-list {
  text-align: center;
}
</style>