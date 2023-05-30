import Pusher from 'pusher-js'

import { config } from './constant'
import { getFromLocalStorage } from './utility'

const data = getFromLocalStorage('user-data')
const pusher = new Pusher(config.pusher.api_key, {
  cluster: config.pusher.cluster,
  authEndpoint: config.url.api + '/pusher/auth',
  auth: {
    params: {
      user_id: data.id,
      username: data.username,
    },
  },
})

// const channel = pusher.subscribe('presence-chat-room')

export { pusher }
