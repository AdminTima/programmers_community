<template>
  <div class="update-profile-form" >
    <eye-icon/>
    <my-input class="update-user-input" v-model="userData.currentPassword" type="password" placeholder="Current Password"/>
    <my-input class="update-user-input" v-model="userData.newPassword" type="password" placeholder="New password"/>
    <my-btn btn_type="s" @click="sendUpdatedUserData">Update</my-btn>
  </div>
</template>

<script>
import EyeIcon from 'vue-material-design-icons/EyeOutline.vue';
export default {
  components: { EyeIcon, },
  props: {
    username: { type: String, required: true },
  },
  data() {
    return {
      file: '',
      currentPassword: '',
      userData: {
        username: this.username,
        newPassword: '',
      }
    }
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    sendUpdatedUserData() {

      this.$emit('updateUser', this.userData);
    }
  },
}
</script>

<style scoped>
.update-profile-form {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.update-user-input {
  display: block;
  margin-bottom: 10px;
}
.file-upload {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.file-input-label {
  font-size: 19px;
  font-weight: bold;
  margin: 5px ;
}

</style>