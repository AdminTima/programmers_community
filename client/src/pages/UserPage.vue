<template>
  <div class="user-page">
    <div class="user-page-header">
        <img class="user-image" :src="userImageLink" alt="user-image">
        <h1>{{ user.username }}</h1>
    </div>
    <div class="user-options">
      <my-btn class="user-options-btn" btn_type="s">Send message</my-btn>
      <my-btn class="user-options-btn" btn_type="s">Follow</my-btn>
    </div>
    <rooms-list :rooms="userRooms"/>
  </div>
</template>

<script>
import {authApi} from "@/http/axios-config";
import {USER_MEDIA_URL} from "@/consts/api-consts";
import RoomsList from "@/components/Lists/RoomsList";

export default {
  components: {RoomsList},
  data() {
    return {
      user: {},
      userImageLink: '',
      userRooms: [],
    }
  },
  methods: {
    async getUser() {
      try {
        const response = await authApi.get(`/user/get-user/${this.$route.params.userId}`);
        this.user = response.data;
        this.userImageLink = `${USER_MEDIA_URL}${response.data.userImage}`;
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    },
    async getUserRooms() {
      try {
        const response = await authApi.get(`/room/current-user-rooms/${this.user._id}`);
        this.userRooms = response.data;
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    },
    async getAll() {
      await this.getUser();
      await this.getUserRooms();
    }
  },

  mounted() {
    this.getAll();
  }
}
</script>

<style scoped>
.user-page {
  text-align: center;
}
.user-page-header {
  margin: 20px 0 5px 0;
}
.user-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 60%;

}
.user-options {
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  border-bottom: 2px solid lime;
  padding-bottom: 10px;
}
.user-options-btn {
  margin: 3px 5px;
}
</style>