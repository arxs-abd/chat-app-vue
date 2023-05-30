import { createStore } from 'vuex'
import axios, { all } from 'axios'

import { config } from '../helpers/constant'
import { createChatAndTime } from '../helpers/utility'

export const store = createStore({
  state() {
    return {
      messages: {},
      recevierUser: '',
      conversationId: '',
      conversationIdBfr: '',
      socketId: '',
    }
  },
  mutations: {
    setUsername(state, username) {
      state.recevierUser = username
    },
    setConversationId(state, id) {
      state.conversationIdBfr = state.conversationId + ''
      state.conversationId = id
    },
    setSocketId(state, id) {
      state.socketId = id
    },
    setMessage(state, message) {
      state.messages = message
    },
    addMessage(state, message) {
      const date = new Date(message.created_at)
      const day = date.getDate()
      const month = date.getMonth()
      const year = date.getFullYear()
      const newDate = new Date(`${year}-${month}-${day}`)
      if (newDate in state.messages) state.messages[newDate].push(message)
      else state.messages[newDate] = [message]
    },
    resetMessage(state) {
      state.messages = []
    },
  },
  actions: {
    async getChat({ commit }, { accessToken, id_chat }) {
      const options = {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
      const response = await axios.get(
        config.url.api + `/api/conversation/message/${id_chat}`,
        options
      )
      commit('setMessage', createChatAndTime(response.data.chat))
    },
  },
})
