<template>
  <div class="room-list-item">

  <router-link
      class="room-name"
      :to='{ name:"Room", params: {roomId: room._id} }'>
      {{ room.name }}
  </router-link>

  </div>
</template>

<script>
export default {
  props: {
    room: {type: Object, required: true},
  }
}
</script>

<style scoped>
.room-name {
  font-size: 24px;
  font-style: oblique;
  color: blue;
  font-weight: bold;
  text-decoration: none;

}
.room-list-item {
  padding: 5px;
  margin-bottom: 15px;
  border-bottom: 3px solid cyan;
  border-left: 2px solid cyan;
  border-right: 2px solid cyan;
  border-top: 1px solid cyan;
  border-radius: 5px;
}
</style>