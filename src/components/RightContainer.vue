<template>
  <div class="container-chat border">
    <div class="chat-contact border">
      <div id="back">
        <span>🡰</span>
      </div>
      <ContactInfo />
    </div>
    <ChatContainer />
    <div class="chat-input">
      <form id="form-message" @submit.prevent="submitMessage">
        <input
          id="text"
          type="text"
          name="input-chat"
          placeholder="Enter Your Message"
          v-model="message"
          autofocus
          autocomplete="off"
        />
        <button id="send" type="submit">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'

import { getFromLocalStorage } from '../helpers/utility'
import { config } from '../helpers/constant'
import Chat from './right/Chat.vue'
import ContactInfo from './left/ContactInfo.vue'
import ChatContainer from './right/ChatContainer.vue'

export default {
  components: {
    Chat,
    ContactInfo,
    ChatContainer,
  },
  setup() {
    const store = useStore()
    const message = ref('')
    const conversationId = computed(() => {
      return store.state.conversationId
    })
    const socketId = computed(() => {
      return store.state.socketId
    })
    const data = getFromLocalStorage('user-data')

    const submitMessage = async () => {
      if (message.value === '') return

      const messageData = {
        id: data.id,
        conversationId: conversationId.value,
        message: message.value,
      }

      const options = {
        headers: {
          Authorization: 'Bearer ' + data.accessToken,
          'x-socket-id': socketId.value,
        },
      }

      await axios.post(config.url.api + '/api/chat', messageData, options)

      const sendData = {
        sender_id: data.id,
        conversationId: conversationId.value,
        message: message.value,
        created_at: new Date().toISOString(),
      }

      store.commit('addMessage', sendData)
      message.value = ''
    }

    return {
      submitMessage,
      message,
    }
  },
}
</script>

<style scoped>
.container-chat {
  width: 65%;
  /* padding: 10px; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--color3);
  font-family: 'Lato', sans-serif;
  /* height: 100%; */
}

.container-chat:has(div.chat) #no-chat {
  display: none;
}

.chat-contact {
  display: flex;
  /* flex-direction: column; */
  font-family: 'Inter', sans-serif;
  padding: 5px;
  column-gap: 10px;
  height: 12%;
  background-color: var(--color1);
}

#back {
  width: 45px;
  color: black;
  height: auto;
  text-align: center;
  cursor: pointer;
  font-size: x-large;
  display: flex;
  justify-content: center;
  align-items: center;
}

#back:hover {
  background-color: var(--color1);
  color: white;
}

.chat-input {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 10%;
}

input {
  height: 80%;
  width: 75%;
}

button {
  height: 80%;
  width: 20%;
  border-radius: 10px;
  cursor: pointer;
}

#text {
  background-color: var(--color2);
  font-size: large;
  padding: 2px;
  font-weight: lighter;
  border-radius: 10px;
}

#send {
  background-color: var(--bgcolor);
  font-size: medium;
}

#form-message {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
