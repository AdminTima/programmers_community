<template>
  <div class="navbar">
    <div v-if="$store.state.isAuth" class="authenticated-navbar">
      <router-link class="nav-link" :to="{name: 'Index'}">Main</router-link>
      <router-link class="nav-link" :to="{name: 'CreateRoom'}">Create Room</router-link>
      <router-link
          class="nav-link"
          :to="{name: 'Profile'}">
        Profile
      </router-link>
    </div>
    <div v-else class="not-authenticated-navbar">
      <router-link class="nav-link" :to="{name: 'Login'}">Login</router-link>
      <router-link class="nav-link" :to="{name: 'SignUp'}">Sign up</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: '',
    }
  },
  methods: {
    getUserId() {
      this.userId = localStorage.getItem('userId');
    }
  },
  mounted() {
    this.getUserId();
  },
  created() {
    this.userId = localStorage.getItem('userId');
    window.addEventListener('storage', () => {
      this.userId = localStorage.getItem('userId');
    })
  }

}
</script>

<style scoped>
.navbar {
  background-color: lightcyan;
  border: 2px solid lime;
  border-radius: 10px;
  padding: 6px 12px;
  position: fixed;
  top: 0;
  right: 20%;
  left: 20%;
}
.authenticated-navbar {
  display: flex;
  justify-content: space-around;

}
.not-authenticated-navbar {
  display: flex;
  justify-content: space-around;
}
.nav-link {
  text-decoration: none;
  color: crimson;
  font-style: unset;
  font-weight: bold;
  font-size: 20px;

}
</style>