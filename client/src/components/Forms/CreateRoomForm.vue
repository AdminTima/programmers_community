<template>
  <form class="create-room-form" @submit.prevent>
    <my-input class="my-inp" v-model="room.name" type="text" placeholder="Enter desired room name"/>
    <br>
    <my-input class="my-inp" v-model="room.description" type="text" placeholder="Enter description "/>
    <br>
    <my-select
        class="my-select"
        v-model="room.topicId"
        :options="topics"
        val="_id"
        defaultVal="Select topic of room"
    />
    <br>
    <my-btn class="my-btn" btn_type="s" @click="createRoom">Create</my-btn>
  </form>
</template>

<script>
import {authApi} from "@/http/axios-config";

export default {

  props: {
    topics: { type: Array, required: true },
  },
  data() {
    return {
      room: {
        name:'',
        description:'',
        topicId: '',
      },
    }
  },
  methods: {

    async createRoom() {
      try {
        if(this.room.name && this.room.topicId) {
          const response = await authApi.post('/room/create', {...this.room});
          console.log(response);
          this.$router.push({ name: 'Index' });
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
}
</script>

<style scoped>
.create-room-form {
  margin: 10px 0;
  border: 2px solid lime;
  border-radius: 20px;
  padding: 10px 0;
}
.my-inp {
  margin-bottom: 20px;
}
.my-select {
  margin-bottom: 20px;
  font-size: 15px;
  font-weight: bold;
}
.my-btn {
  margin-bottom: 10px;
}
</style>