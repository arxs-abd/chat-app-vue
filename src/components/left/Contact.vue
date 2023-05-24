<template>
  <div class="item-card" @click="handleContactClick">
    <span v-bind:data-id="contact.id_chat">{{ contact.sender.username }}</span>
    <span class="last-chat">Last Chat</span>
  </div>
</template>

<script>
import { useStore } from 'vuex'

import { getFromLocalStorage } from '../../helpers/utility'

export default {
  props: ['contact'],
  setup(props) {
    const data = getFromLocalStorage('user-data')
    const store = useStore()

    const handleContactClick = (e) => {
      store.commit('setUsername', props.contact.sender.username)
      store.commit('resetMessage')
      store.dispatch('getChat', {
        accessToken: data.accessToken,
        id_chat: props.contact.id_chat,
      })
    }

    return {
      handleContactClick,
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
