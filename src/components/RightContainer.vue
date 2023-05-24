<template>
  <div class="container-chat border">
    <div class="chat-contact border">
      <div id="back">
        <span>🡰</span>
      </div>
      <ContactInfo />
    </div>
    <ChatContainer />
    <div class="chat-input">
      <input
        id="text"
        type="text"
        name="input-chat"
        value=""
        placeholder="Enter Your Message"
        autofocus
      />
      <button id="send">Send</button>
    </div>
  </div>
</template>

<script>
import Chat from './right/Chat.vue'
import ContactInfo from './left/ContactInfo.vue'
import ChatContainer from './right/ChatContainer.vue'

export default {
  components: {
    Chat,
    ContactInfo,
    ChatContainer,
  },
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
