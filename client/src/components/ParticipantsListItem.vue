<template>
  <div>
    <router-link :to="{name: 'User', params: {userId: participant.userId._id}}">
      <h2>{{ participant.userId.username }}</h2>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    participant: { type: Object, required: true },
  }
}
</script>

<style scoped>

</style>