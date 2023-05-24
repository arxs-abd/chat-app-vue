<template>
  <div class="contact">
    <span id="user-to" data-id="1641471038593">{{ username || 'Budi' }}</span>
    <span id="user-to-status" class="status">Offline</span>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  props: ['info'],
  setup() {
    const store = useStore()
    const username = computed(() => {
      return store.state.recevierUser
    })

    return {
      username,
    }
  },
}
</script>

<style>
.contact {
  display: flex;
  flex-direction: column;
  text-align: left;
  height: fit-content;
  font-size: xx-large;
  text-transform: capitalize;
}
.status {
  font-size: 15px;
  font-weight: 200;
}
</style>
