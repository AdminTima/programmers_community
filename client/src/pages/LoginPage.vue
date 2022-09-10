<template>
  <div class="login-page">
    <h1>Login {{ $store.state.isAuth }}</h1>
    <login-register-form @logOrReg="loginUser" :is-login-page="true" />
  </div>
</template>

<script>
import LoginRegisterForm from "@/components/Forms/LoginRegisterForm";
import {publicApi} from "@/http/axios-config";
import jwt_decode from "jwt-decode";
export default {
  name: 'Login',
  components: {LoginRegisterForm},

  methods: {
    async loginUser(credentials) {
      try {
          const response = await publicApi.post('/user/login', {...credentials});
          console.log(response.data);
          const userInfo = jwt_decode(response.data.accessToken);
          console.log(userInfo);
          localStorage.setItem('access', response.data.accessToken);
          localStorage.setItem('isAuth', 'true');
          localStorage.setItem('username', userInfo.username);
          localStorage.setItem('userId', userInfo.id);
          this.$store.commit('changeIsAuth', true);
          this.$router.push({name: 'Index'});
      } catch (err) {
          console.log(err);
      }

    }
  }

}
</script>

<style scoped>
.login-page {
  text-align: center;
}
</style>