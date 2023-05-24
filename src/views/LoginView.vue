<template>
  <div class="container-login">
    <div class="login-box">
      <h1>Login Chat Apps</h1>
      <form id="form-login" @submit="loginForm">
        <input
          type="text"
          name="username"
          v-model="username"
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          v-model="password"
          placeholder="Password"
        />
        <button id="login-button" type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { config } from '../helpers/constant'
import { getFromLocalStorage, setFromLocalStorage } from '../helpers/utility'

export default {
  data() {
    return {
      username: 'aris',
      password: '1234',
    }
  },
  methods: {
    loginForm(e) {
      e.preventDefault()

      const username = this.username
      const password = this.password
      const data = {
        username,
        password,
      }
      axios
        .post(config.url.api + '/api/login', data)
        .then((response) => {
          const data = response.data.data
          data.accessToken = response.data.accessToken
          setFromLocalStorage('user-data', response.data.data)
          this.$router.push('/')
        })
        .catch((error) => {
          if (error.response) alert(error.response.data.msg)
        })
    },
  },
  setup() {
    const router = useRouter()
    onMounted(() => {
      if (getFromLocalStorage('user-data').username) router.push('/')
    })
  },
}
</script>

<style>
.container-login {
  font-family: 'Inter', sans-serif;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-box {
  width: 50%;
  min-width: 400px;
  height: 40%;
  padding: 10px;
  background-color: var(--color3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#form-login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

#form-login input {
  width: 80%;
  height: 20%;
  border-radius: 7px;
  background-color: var(--color2);
  margin-top: 10px;
}

#form-login button {
  width: 80%;
  margin-top: 10px;
  background-color: var(--bgcolor);
  height: 50px;
  cursor: pointer;
}
</style>
