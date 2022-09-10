<template>
  <div>
    <messages-list-item @show_image="showImage" v-for="message in messages" :message="message"/>
  </div>
</template>

<script>
import MessagesListItem from "@/components/MessagesListItem";

export default {
  components: {MessagesListItem},
  props: {
    messages: { type: Array, required: true },
  },
  methods: {
    showImage(imagePath) {
      this.$emit('show_image', imagePath);
    }
  }
}

</script>

<style scoped>

</style>