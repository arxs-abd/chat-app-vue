<template>
    <div class="container-chat border">
        <div class="chat-contact border">
            <div id="back">
                <span>🡰</span>
            </div>
            <ContactInfo />
        </div>
        <div class="chat-output border">
            <div id="no-chat">
                <span>
                    <strong>Click Contact</strong> <br> To Chat
                </span>
            </div>
            <div v-for="message in allMessages">
                <Chat :message="message" />
            </div>
        </div>
        <div class="chat-input">
            <input id="text" type="text" name="input-chat" value="" placeholder="Enter Your Message" autofocus>
            <button id="send">Send</button>
        </div>
    </div>
</template>

<script>
    import { computed } from 'vue';
    import { useStore } from 'vuex';
    
    import Chat from './Chat.vue'
    import ContactInfo from './ContactInfo.vue'
    import { getFromLocalStorage } from '../helpers/utility';

    export default {
        components : {
            Chat,
            ContactInfo,
        },
        setup() {
            const store = useStore()

            const allMessages = computed(() => {
                return store.state.messages
            })

            return {
                allMessages
            }

        }
    }
</script>

<style scoped>
    .container-chat {
        width: 65%;
        /* padding: 10px; */
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: var(--color3);
        font-family: 'Lato', sans-serif;
        /* height: 100%; */
    }

    .container-chat:has(div.chat) #no-chat {
        display: none;
    }

    .container-user.hidden + .container-chat {
        width: 100% !important;
    }
    .container:has(.container-chat.hidden) .container-user {
        width: 100% !important;
    }

    #no-chat {
        display: flex;
        height: 100%;
        text-align: center;
        align-items: center;
        justify-content: center;
        font-weight: 200;
        font-size: larger;
    }

    .chat-contact {
        display: flex;
        /* flex-direction: column; */
        font-family: 'Inter', sans-serif;
        padding: 5px;
        column-gap: 10px;
        height: 12%;
        background-color: var(--color1);
    }

    #back {
        width: 45px;
        color: black;
        height: auto;
        text-align: center;
        cursor: pointer;
        font-size: x-large;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #back:hover {
        background-color: var(--color1);
        color: white;
    }

    .chat-output {
        padding: 10px;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        height: 88%;
        font-family: 'Inter', sans-serif !important;
    }

    .chat {
        display: flex;
        color: white;
        margin-top: 5px;
        margin-bottom: 5px;
        margin-left: 4px;
        margin-right: 4px;
    /* background-color: red; */
    }

    .date-chat {
        font-size: small;
        font-weight: normal;
        text-transform: capitalize;
        background-color: grey;
        color: white;
        width: fit-content;
        padding: 8px;
        border-radius: 10px;
        align-self: center;
        text-align: center;
    }

    .chat-text {
        text-align: left;
        font-size: 15px;
        font-weight: normal;
        width: fit-content;
        max-width: 90%;
        background-color: var(--color2);
        padding: 5px;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        word-wrap: break-word;
        word-break: break-all
    }

    .chat-date {
        margin-top: 5px;
        font-size: 13px;
    }

    .chat .chat-date {
        text-align: right;
    }

    .by-user .chat-date {
        text-align: left;
    }

    .by-user {
        justify-content: flex-end;
    }

    .by-user .chat-text {
        background-color: var(--bgcolor);
    /* background-color: #202c33; */
    }

    .chat-input {
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 10%;
    }

    input {
        height: 80%;
        width: 75%;
    }

    button {
        height: 80%;
        width: 20%;
        border-radius: 10px;
    }

    #text {
        background-color: var(--color2);
        font-size: large;
        padding: 2px;
        font-weight: lighter;
        border-radius: 10px;
    }

    #send {
        background-color: var(--bgcolor);
        font-size: medium;
    }
</style>