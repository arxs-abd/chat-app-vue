<template>
  <div
    class="item-card"
    :class="{ active: active }"
    @click="handleContactClick"
  >
    <span v-bind:data-id="contact.id_chat">{{ contact.sender.username }}</span>
    <span class="last-chat">Last Chat</span>
  </div>
</template>

<script>
import { useStore } from 'vuex'

import { getFromLocalStorage } from '../../helpers/utility'
import { pusher } from '../../helpers/pusher'
import { computed } from '@vue/reactivity'

export default {
  props: ['contact', 'activeContact', 'updateActiveContact'],
  setup(props) {
    const data = getFromLocalStorage('user-data')
    const store = useStore()
    const active = computed(() => {
      return props.contact.sender.id === props.activeContact
    })
    const conversationId = computed(() => {
      return store.state.conversationId
    })

    const handleContactClick = async () => {
      if (props.contact.sender.id === props.activeContact) return
      store.commit('setUsername', props.contact.sender.username)
      store.commit('setConversationId', props.contact.id_chat)
      store.dispatch('getChat', {
        accessToken: data.accessToken,
        id_chat: props.contact.id_chat,
      })
      props.updateActiveContact(props.contact.sender.id)

      const channel = pusher.subscribe('presence-chat-room')
      channel.unbind_all()
      channel.bind(conversationId.value, (data) => {
        if (props.contact.id_chat !== conversationId.value) return
        if (props.contact.id_chat === data.id) return
        store.commit('addMessage', data)
      })
    }

    return {
      handleContactClick,
      active,
    }
  },
}
</script>
<style>
.item-card {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  text-align: left;
  font-size: 25px;
  font-weight: bolder;
  margin: 5px;
  padding: 5px;
}

.item-card > span:first-child {
  text-transform: capitalize;
}

.item-card:hover {
  background-color: var(--bgcolor);
  color: white;
  cursor: pointer;
}

.active {
  background-color: var(--bgcolor);
  color: white;
  cursor: pointer;
}

.last-chat {
  font-size: 15px;
  font-weight: 200;
}
</style>
