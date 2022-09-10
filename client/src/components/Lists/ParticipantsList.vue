<template>
  <div>
    <h1>Participants</h1>
    <participants-list-item v-for="participant in participants" :participant="participant"/>
  </div>
</template>

<script>
import ParticipantsListItem from "@/components/ParticipantsListItem";
export default {
  components: {ParticipantsListItem},
  props: {
    participants: { type: Array, required: true },
  }
}
</script>

<style scoped>

</style>