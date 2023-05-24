<template>
    <div class="container">
        <ContactContainer/>
        <ChatContainer/>
    </div>
</template>

<script>
    import { useRouter } from 'vue-router'
    import { onMounted } from 'vue'
    import { useStore } from 'vuex'

    import ContactContainer from '../components/ContactContainer.vue'
    import ChatContainer from '../components/ChatContainer.vue'

    import { getFromLocalStorage} from '../helpers/utility'

    export default {
        components : {
            ContactContainer,
            ChatContainer,
        },
        setup() {
            const router = useRouter()
            const store = useStore()
            onMounted(() => {
                if (!getFromLocalStorage('user-data').username) router.push('/login')
                store.commit('resetMessage')
            })
        }
    }
</script>

<style>
    .container {
        width: 90%;
        display: flex;
        margin: auto;
        justify-content: space-between;
        height: 90vh;
        padding: 5px;
    }
</style>