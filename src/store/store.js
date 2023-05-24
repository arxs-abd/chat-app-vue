import {createStore} from 'vuex'
import axios from 'axios'
import { config } from '../helpers/constant'


export const store = createStore({
    state() {
        return {
            messages : [],
            recevierUser : ''
        }
    },
    mutations : {
        setUsername(state, username) {
            state.recevierUser = username
        },
        setMessage(state, message) {
            state.messages = message
        },
        resetMessage(state) {
            state.messages = []
        }
    },
    actions : {
        async getChat({ commit }, {accessToken, id_chat}) {
            const options = {
                headers : {
                    Authorization : 'Bearer ' + accessToken,
                }
            }
            const response = await axios.get(config.url.api + `/api/conversation/message/${id_chat}`, options)
            commit('setMessage', response.data.chat)
        }
    }
})