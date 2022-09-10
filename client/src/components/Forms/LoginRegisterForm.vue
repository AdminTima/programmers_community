<template>
  <div class="login-reg-form">
    <p class="error" v-if="passwordsError">{{ passwordsError }}</p>

      <my-input
          class="login-reg-input"
          required
          v-model="credentials.username"
          type="text"
          placeholder="Username..."
      />
      <my-input
          class="login-reg-input"
          required
          v-model="credentials.password"
          type="password"
          placeholder="Password..."
      />
      <my-input
          class="login-reg-input"
          required
          v-model="passwordConfirm"
          v-if="!isLoginPage"
          type="password"
          placeholder="Confirm password"
      />
      <my-btn
          btn_type="s"
          @click="checkIfPasswordsDidNotMatch">
        {{ isLoginPage ? 'Login' : 'Sign up' }}
      </my-btn>

  </div>
</template>

<script>
export default {
  props: {
    isLoginPage: {type: Boolean, default:false},
  },
  data() {
    return {
      credentials: {
        username: '',
        password: '',
      },
      passwordConfirm: '',
      passwordsError: '',
    }
  },
  methods: {
    checkIfPasswordsDidNotMatch() {
     if(!this.isLoginPage && this.credentials.password !== this.passwordConfirm) {
        this.passwordsError = 'Passwords does not match';
      } else  {
       this.sendCredentials();
     }
    },
    sendCredentials() {
      this.$emit('logOrReg', this.credentials);
    }
  }
}
</script>

<style scoped>
.login-reg-form {
  border: 2px solid lightseagreen;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  border-radius: 10px;
}
.login-reg-input {
  margin-bottom: 10px;
  font-size: 20px;
}
</style>