<template>
  <div v-for="contact in allContact">
    <Contact :contact="contact" />
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

import Contact from './Contact.vue'

import { getFromLocalStorage } from '../../helpers/utility'
import { config } from '../../helpers/constant'

export default {
  components: {
    Contact,
  },
  setup() {
    let allContact = ref([])
    const data = getFromLocalStorage('user-data')
    let user = ref(data.username)
    const options = {
      headers: {
        Authorization: 'Bearer ' + data.accessToken,
      },
    }
    axios
      .get(config.url.api + '/api/conversation', options)
      .then((response) => {
        allContact.value = response.data.data
      })

    return {
      allContact,
    }
  },
}
</script>

<style></style>
