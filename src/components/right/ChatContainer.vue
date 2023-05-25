<template>
  <div ref="chatContainer" class="chat-output">
    <div id="no-chat">
      <span>
        <strong>Click Contact</strong> <br />
        To Chat
      </span>
    </div>
    <div class="special" v-for="time of Object.keys(allMessages)">
      <TimeChat :time="time" />
      <div>
        <Chat v-for="message of allMessages[time]" :message="message" />
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref, onUpdated } from 'vue'

import Chat from './Chat.vue'
import TimeChat from './TimeChat.vue'

export default {
  components: {
    Chat,
    TimeChat,
  },
  setup() {
    const chatContainer = ref(null)

    const store = useStore()
    // const timeChat = {}
    const allMessages = computed(() => {
      // timeChat = Object.keys(store.state.messages)
      return store.state.messages
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
      // timeChat,
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
</style>
