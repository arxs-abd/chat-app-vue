<template>
    <div class="container-user">
        <div class="user" @mouseout="handleMouseOut" @mouseover="handleMouseOver">
            <span id="username">{{user}}</span>
        </div>
        <div class="find-user">
            <span id="username">Find User</span>
        </div>
        <div v-for="contact in allContact">
            <Contact :contact="contact"/>
        </div>
    </div>
</template>

<script>
    import { ref } from 'vue'
    import axios from 'axios'
    
    import Contact from './Contact.vue'
    
    import { getFromLocalStorage } from '../helpers/utility'
    import { config } from '../helpers/constant'

    export default {
        components : {
            Contact
        },
        setup() {
            let allContact = ref([])
            const data = getFromLocalStorage('user-data')
            let user = ref(data.username)
            const options = {
                headers : {
                    Authorization : 'Bearer ' + data.accessToken,
                }
            }
            axios.get(config.url.api + '/api/conversation', options).then(response => {
                allContact.value = response.data.data
            })

            const handleMouseOver = (e) => {
                user.value = 'logout'
            }
            const handleMouseOut = (e) => {
                user.value = data.username
            }

            return {
                allContact, user, handleMouseOut, handleMouseOver
            }
        }

    }
</script>

<style scoped>
    .container-user {
        align-self: flex-start;
        width: 30%;
        height: 100%;
        background-color: var(--color3);
        font-family: 'Lato', sans-serif;
    }

    #username {
    display: block;
    }

    .user {
        align-content: center;
        justify-content: center;
        text-align: left;
        margin: 5px;
        padding: 5px;
        text-align: center;
        font-size: 2rem;
        background-color: var(--color1);
        color: white;
        font-weight: bold;
        cursor: pointer;
        text-transform: capitalize;
    }

    .find-user {
        align-content: center;
        justify-content: center;
        text-align: left;
        margin: 5px;
        padding: 5px;
        text-align: center;
        background-color: var(--color1);
        color: white;
        font-size: medium;
        cursor: pointer;
    }
</style>