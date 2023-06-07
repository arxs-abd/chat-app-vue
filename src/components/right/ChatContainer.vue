<template>
  <div ref="chatContainer" class="chat-output">
    <div id="no-chat">
      <span>
        <strong>Click Contact</strong> <br />
        To Chat
      </span>
    </div>
    <div v-if="allMessages">
      <div class="special" v-for="(time, index) of Object.keys(allMessages)">
        <span class="date-chat">{{ createTimeForHuman(time) }}</span>
        <div>
          <Chat v-for="message of allMessages[time]" :message="message" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref, onUpdated } from 'vue'

import Chat from './Chat.vue'
import TimeChat from './TimeChat.vue'
import { createTimeForHuman } from '../../helpers/utility'

export default {
  components: {
    Chat,
    TimeChat,
  },
  setup() {
    const chatContainer = ref(null)

    const store = useStore()
    const conversationId = computed(() => {
      return store.state.conversationId
    })
    const allMessages = computed(() => {
      if (conversationId.value === '') return ''
      return store.state.messages[conversationId.value]
    })

    onUpdated(() => {
      scrollToBottom()
    })

    const scrollToBottom = () => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop =
          chatContainer.value.scrollHeight - chatContainer.value.offsetHeight
      }
    }

    return {
      allMessages,
      chatContainer,
      createTimeForHuman,
    }
  },
}
</script>

<style>
.container-chat:has(div.chat) #no-chat {
  display: none;
}
#no-chat {
  display: flex;
  height: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-weight: 200;
  font-size: larger;
}
.chat-output {
  padding: 10px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  height: 88%;
  font-family: 'Inter', sans-serif !important;
}

.special {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  /* padding: 10px; */
}

.date-chat {
  font-size: small;
  font-weight: normal;
  text-transform: capitalize;
  background-color: grey;
  color: white;
  width: fit-content;
  padding: 8px;
  border-radius: 10px;
  align-self: center;
  text-align: center;
  margin: 10px 0;
}
</style>
