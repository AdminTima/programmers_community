<template>
  <form @submit.prevent>
    <input v-model="messageText" type="text" placeholder="Enter your message"/>
    <input ref="msgImg" type="file">
    <arrow-right-circle @click="sendMessage" size="50"/>
  </form>
</template>

<script>
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import ArrowRightCircle from 'vue-material-design-icons/ArrowRightCircle.vue';
export default {
  components: { MenuIcon, ArrowRightCircle },
  props: ['socket'],

  data() {
    return {
      messageText: '',
      allowedFileExtensions: ['jpg', 'png'],
    }
  },
  methods: {
    sendMessage() {
      if (this.messageText) {
        const messageData = {messageText: this.messageText, roomId: this.$route.params.roomId}
        const file = this.$refs.msgImg.files[0];
        if (file) {
          const fileExtension = file.name.split('.')[1];
          if (this.allowedFileExtensions.includes(fileExtension)) {
            messageData.messageImage = file;
            console.log('in eall');
            this.$refs.msgImg.value = '';
          }
        }
        this.socket.emit('send_message', messageData);
        this.messageText = '';
      }
    }
  }
}
</script>

<style scoped>

</style>