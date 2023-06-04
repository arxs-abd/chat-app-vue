<template>
  <div class="container-user">
    <div
      class="user"
      @mouseout="handleMouseOut"
      @mouseover="handleMouseOver"
      @click="logout"
    >
      <span id="username">{{ user }}</span>
    </div>
    <div class="find-user">
      <span id="username">Find User</span>
    </div>
    <ContactContainer />
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

import Contact from './left/Contact.vue'
import ContactContainer from './left/ContactContainer.vue'

import { getFromLocalStorage, deleteLocalStorage } from '../helpers/utility'
import { config } from '../helpers/constant'
import { useRouter } from 'vue-router'

export default {
  components: {
    Contact,
    ContactContainer,
  },
  setup() {
    let allContact = ref([])
    const data = getFromLocalStorage('user-data')
    let user = ref(data.username)
    const router = useRouter()

    const options = {
      headers: {
        Authorization: 'Bearer ' + data.accessToken,
      },
    }

    axios
      .get(config.url.api + '/api/conversation', options)
      .then((response) => {
        allContact.value = response.data.data
      })

    const handleMouseOver = () => {
      user.value = 'logout'
    }
    const handleMouseOut = () => {
      user.value = data.username
    }

    const logout = () => {
      deleteLocalStorage()
      return router.push('/login')
    }

    return {
      allContact,
      user,
      handleMouseOut,
      handleMouseOver,
      logout,
    }
  },
}
</script>

<style scoped>
.container-user {
  align-self: flex-start;
  width: 30%;
  height: 100%;
  background-color: var(--color3);
  font-family: 'Lato', sans-serif;
}

#username {
  display: block;
}

.user {
  align-content: center;
  justify-content: center;
  text-align: left;
  margin: 5px;
  padding: 5px;
  text-align: center;
  font-size: 2rem;
  background-color: var(--color1);
  color: white;
  font-weight: bold;
  cursor: pointer;
  text-transform: capitalize;
}

.find-user {
  align-content: center;
  justify-content: center;
  text-align: left;
  margin: 5px;
  padding: 5px;
  text-align: center;
  background-color: var(--color1);
  color: white;
  font-size: medium;
  cursor: pointer;
}
</style>
