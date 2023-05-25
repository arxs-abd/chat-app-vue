<template>
  <!-- <div v-for="(contact, index) in allContact"> -->
  <Contact
    v-for="(contact, index) in allContact"
    :contact="contact"
    :index="index"
    :activeContact="activeContact"
    :updateActiveContact="updateActiveContact"
  />
  <!-- </div> -->
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

import Contact from './Contact.vue'

import { getFromLocalStorage } from '../../helpers/utility'
import { config } from '../../helpers/constant'
import { onMounted } from 'vue'

export default {
  components: {
    Contact,
  },
  setup() {
    let allContact = ref([])
    const data = getFromLocalStorage('user-data')
    const activeContact = ref(null)

    onMounted(async () => {
      const options = {
        headers: {
          Authorization: 'Bearer ' + data.accessToken,
        },
      }
      const response = await axios.get(
        config.url.api + '/api/conversation',
        options
      )
      allContact.value = response.data.data
    })

    const updateActiveContact = (contact) => {
      activeContact.value = contact
    }

    return {
      allContact,
      activeContact,
      updateActiveContact,
    }
  },
}
</script>

<style></style>
