<template>
    <div class="chat" :class="{'by-user': byUser}">
        <div class="chat-text">
            <span class="chat-txt">{{ text }}</span>
            <span class="chat-date">{{ time }}</span>
        </div>
    </div>
</template>

<script>
import { formatterTimeChat, getFromLocalStorage } from '../helpers/utility'

    export default {
        props : ['message'],
        setup(props) {
            const timeChat = new Date(props.message.created_at)
            const text = props.message.message
            const time = formatterTimeChat.format(timeChat)
            const byUser = getFromLocalStorage('user-data').id === props.message.sender_id


            return {
                text, time, byUser
            }
        }
    }
</script>

<style>
    .chat {
        display: flex;
        color: white;
        margin-top: 5px;
        margin-bottom: 5px;
        margin-left: 4px;
        margin-right: 4px;
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
    }
</style>