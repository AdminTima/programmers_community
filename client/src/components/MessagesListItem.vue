<template>
  <div class="message-list-item">
    <div class="message-header">
      <img class="message-user-image" :src="messageUserImage" alt="userImg">
      <router-link
          :to="{name: 'User', params: {userId: message.userId._id}}"
      >
        <p class="message-username">{{ message.userId.username }}</p>
      </router-link>
    </div>
    <h2>{{ message.messageText }}</h2>
    <img @click="showImage" class="msg-img" v-if="messageImg" :src="messageImg" alt="msg-img">
  </div>
</template>

<script>
import {MESSAGE_MEDIA_URL, USER_MEDIA_URL} from "@/consts/api-consts";
export default {
  props: {
    message: { type: Object, required: true },
  },
  data() {
    return {
      messageUserImage: `${USER_MEDIA_URL}${this.message.userId.userImage}`,
      messageImg: this.message.file ? `${MESSAGE_MEDIA_URL}${this.message.file}`: '',
    }
  },
  methods: {
    showImage() {
      this.$emit('show_image', this.messageImg);
    }
  }
}
</script>

<style scoped>
.message-list-item {
  border: 2px solid lightgreen;
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
}
.message-header {
  display: flex;

}
.msg-img {
  width: 25%;
  height: 30%;
  object-fit: cover;
}
.message-username {
  font-size: 19px;
  font-style: italic;
  font-weight: bold;
}
.message-user-image {
  border-radius: 50%;
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin: 5px;
}
</style>