<template>
  <div ref="chatContainer" class="chat-output">
    <div id="no-chat">
      <span>
        <strong>Click Contact</strong> <br />
        To Chat
      </span>
    </div>
    <div v-for="message in allMessages">
      <Chat :message="message" />
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import Chat from './Chat.vue'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { watch } from 'vue'
import { onUpdated } from 'vue'

export default {
  components: {
    Chat,
  },
  setup() {
    const chatContainer = ref(null)

    const store = useStore()
    const allMessages = computed(() => {
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
</style>
