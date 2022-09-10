<template>
  <div class="sign-up-page">
    <h1>Sign up</h1>
    <login-register-form @logOrReg="signUpUser"/>
  </div>
</template>

<script>
import LoginRegisterForm from "@/components/Forms/LoginRegisterForm";
import {publicApi} from "@/http/axios-config";
export default {

  components: {LoginRegisterForm},

  methods: {
    async signUpUser(credentials) {
      try {
        const response = await publicApi.post(
            '/user/sign-up',
            {...credentials}
        );
        console.log(response.data);
        this.$router.push({name: 'Login'});
      } catch (err) {
        console.log(err);
      }

    }
  }
}
</script>

<style scoped>
.sign-up-page {
  text-align: center;
}
</style>