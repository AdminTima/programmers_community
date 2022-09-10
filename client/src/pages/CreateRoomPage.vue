<template>
  <div class="create-room-page">
    <h1>Create room</h1>
    <create-room-form :topics="topics"/>
  </div>
</template>

<script>
import CreateRoomForm from "@/components/Forms/CreateRoomForm";
import {authApi} from "@/http/axios-config";
export default {
  components: { CreateRoomForm },
  data() {
    return {
      topics: [],
    }
  },
  methods: {
    async getTopics() {
      const response = await authApi.get('/topic/all');
      console.log(response.data);
      this.topics = response.data;
    }
  },
  mounted() {
    this.getTopics();
  }
}
</script>

<style scoped>
.create-room-page {
  text-align: center;
}
</style>