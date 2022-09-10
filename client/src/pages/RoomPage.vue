<template>
  <div>
    <img-modal v-model="showImageModal" >
      <img class="full-size-msg-img" :src="imagePath" alt="msg-img">
    </img-modal>
      <h1>Room</h1>
      <div class="content-container">
        <messages-list @show_image="showImage" class="msg-list" :messages="messages"/>
        <participants-list class="participants-list" :participants="participants"/>
      </div>
    <create-message-form :socket="socket" class="msg-form"/>
  </div>
</template>

<script>
import MessagesList from "@/components/Lists/MessagesList";
import CreateMessageForm from "@/components/Forms/CreateMessageForm";
import {authApi} from "@/http/axios-config";
import ParticipantsList from "@/components/Lists/ParticipantsList";
import {io} from "socket.io-client";
// Add keys to all lists
export default {
  components: {ParticipantsList, MessagesList, CreateMessageForm },
  data() {
    return {
      messages: [],
      participants: [],
      socket: {},
      roomId: this.$route.params.roomId,
      showImageModal: false,
      imagePath: '',
    }
  },
  methods: {
    async getRoomMessages() {
      const response = await authApi.get(`/message/all/${this.roomId}`);
      this.messages = response.data;
      console.log(response.data);
    },
    showImage(imagePath) {
      this.imagePath = imagePath;
      this.showImageModal = true;
    },

    async getRoomParticipants() {
      const response = await authApi.get(`/room/participants/${this.roomId}`);
      this.participants = response.data;
      console.log(response.data);
    },

    async getAll() {
      await this.getRoomMessages();
      await this.getRoomParticipants();
    }
  },

  handleNewMessage(newMessage) {
    console.log(newMessage);
    this.messages.push(newMessage);
  },

  created() {
    this.socket = io('http://localhost:5000', {
      auth: {
        userId: localStorage.getItem('userId'),
      }
    });
    this.socket.emit('join_room', this.roomId);
  },

  mounted() {
    this.socket.on('new_message', (message) => {
      console.log(message);
      this.messages.push(message);
    });
    this.getAll();
  },

}
</script>

<style scoped>
.msg-form {
  position: fixed;
  bottom: 10px;
  width: 80%;
  background-color: lightgreen;
  padding: 20px;
}
.content-container {
  display: flex;
}
.msg-list  {
  flex: 8;
  margin-bottom: 20%;
}
.participants-list {
  flex: 4;
}

.full-size-msg-img {
  object-fit: cover;
  height: 60%;
  width: 60%;
}
</style>