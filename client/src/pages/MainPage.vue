<template>
  <div class="main_container">
    <h1 v-if="!$store.state.isAuth ">{{"You are not currently logged in" }}</h1>
    <div v-else class="main_wrapper">

      <div class="topics_container">
        <h2>All topics</h2>
        <topics-list :topics="topics" class="topics"/>
      </div>

      <div class="rooms_container">
        <h2>All rooms</h2>
        <rooms-list :rooms="rooms" class="rooms"/>
      </div>

    </div>
  </div>
</template>

<script>
import TopicsList from "@/components/Lists/TopicsList";
import RoomsList from "@/components/Lists/RoomsList";
import {authApi} from "@/http/axios-config";

export default {
  components: {TopicsList, RoomsList},
  data() {
    return {
        topics: [],
        rooms: [],
    }
  },
  methods: {
    async getRooms() {
      const response = await authApi.get('/room/all');
      console.log(response.data);
      this.rooms = response.data;
    },
    async getTopics() {
      const response = await authApi.get('/topic/all');
      console.log(response.data);
      this.topics = response.data;
    },
    async getAll() {
      await this.getRooms();
      await this.getTopics();
    }
  },
  mounted() {
    this.getAll();
  }

}
</script>

<style scoped>
.main_wrapper {
  display: flex;
}
.topics_container {
  flex: 3;
  margin-right: 15px;
  text-align: center;
}
.rooms_container {
  flex: 5;
  text-align: center;
}

</style>