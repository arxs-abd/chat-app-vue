<template>
  <div class="container">
    <ContactContainer />
    <ChatContainer />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'

import ContactContainer from '../components/LeftContainer.vue'
import ChatContainer from '../components/RightContainer.vue'

import { getFromLocalStorage, setFromLocalStorage } from '../helpers/utility'
import { pusher } from '../helpers/pusher'
import { config } from '../helpers/constant'

export default {
  components: {
    ContactContainer,
    ChatContainer,
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    // const data = getFromLocalStorage('user-data')

    onMounted(async () => {
      if (!getFromLocalStorage('user-data').username)
        return router.push('/login')

      pusher.connection.bind('connected', async () => {
        store.commit('setSocketId', pusher.connection.socket_id)
      })
    })
  },
}
</script>

<style>
.container {
  width: 90%;
  display: flex;
  margin: auto;
  justify-content: space-between;
  height: 90vh;
  padding: 5px;
}
</style>
