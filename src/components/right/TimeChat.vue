<template>
  <span class="date-chat">{{ time }}</span>
</template>

<script>
export default {
  props: ['time', 'index'],
  setup(props) {
    const time = props.index + ' : ' + props.time
    // const time = createTimeForHuman(props.time)
    return {
      time,
    }
  },
}
</script>

<style>
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
  margin: 10px 0;
}
</style>
