<template>
  <div class="profile">
    <my-modal-window v-model="showUpdateForm">
      <update-profile-form @updateUser="" :username="user.username"/>
    </my-modal-window>

    <my-modal-window v-model="showChangeUsernameForm">
      <my-input placeholder="New username"/>
      <my-btn btn_type="s">Change</my-btn>
    </my-modal-window>

    <my-btn @click="showChangeUsernameForm = true" btn_type="s">Change username</my-btn>

    <div v-if="user._id === currentUserId" class="if_user_owner">

      <div class="profile-header">
        <img class="user-image" :src="userImageLink" alt="user-image">
        <h1>Your profile {{ user.username }}</h1>
      </div>

      <my-btn btn_type="s" @click="showUpdateForm = true">Change password</my-btn>
      <div class="profile-options">
        <my-btn btn_type="w" @click="logoutUser">Logout</my-btn>
        <input type="file" ref="file" @change="handleFileUpload()">
        <my-btn btn_type="s" @click="submitFile">Photo</my-btn>
      </div>
    </div>
    <div class="user-rooms">
      <h2>Your rooms</h2>
      <rooms-list :rooms="userRooms"/>
    </div>

  </div>
</template>

<script>
import {authApi} from "@/http/axios-config";
import CreateRoomForm from "@/components/Forms/CreateRoomForm";
import {USER_MEDIA_URL} from "@/consts/api-consts";
import RoomsList from "@/components/Lists/RoomsList";
import UpdateProfileForm from "@/components/Forms/ChangePasswordForm";

export default {
  components: {UpdateProfileForm, RoomsList, CreateRoomForm},
  data() {
    return {
      file: '',
      user: {},
      userImageLink: '',
      userRooms: [],
      currentUserId: '',
      showUpdateForm: false,
      showChangeUsernameForm: false,
    }
  },
  methods: {

    async logoutUser() {
      await authApi.get('/user/logout');
      localStorage.removeItem('isAuth');
      localStorage.removeItem('access');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
      this.$router.push({name: 'Login'});
    },

    async getUser() {
      try {
        const response = await authApi.get(`/user/get-current-user`);
        console.log(response.data);
        this.user = response.data;
        this.userImageLink = `${USER_MEDIA_URL}${response.data.userImage}`;
      } catch (err) {
        console.log(err);
      }
    },

    async getUserRooms() {
      try {
        const response = await authApi.get('/room/user-rooms');
        this.userRooms = response.data;
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    },

    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },

    async submitFile() {
      const formData = new FormData();
      formData.append('userPhoto', this.file);
      const resp = await authApi.post('/user/set-photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      this.$refs.file.value = '';
      await this.getUser();
    },
    async changeUserName() {
      try {
        await authApi.post('');
      } catch (err) {

      }
    },
    async getAll() {
      await this.getUser();
      await this.getUserRooms();
    },
  },

  mounted() {
    this.getAll();
  },
  created() {
    this.currentUserId = localStorage.getItem('userId');
  }
}
</script>

<style scoped>
.profile {
  text-align: center;
}
.user-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 60%;
  margin-top: 30px;
}

</style>