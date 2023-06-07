const getFromLocalStorage = (key, falseResult = []) => {
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : falseResult
}

const setFromLocalStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value))
}

const deleteLocalStorage = () => {
  return localStorage.clear()
}

const createChatAndTime = (message) => {
  const result = {}

  for (const chat of message) {
    const date = new Date(chat.created_at)
    const day = date.getDate()
    const month = Number(date.getMonth()) + 1
    const year = date.getFullYear()
    const newDate = new Date(`${year}-${month}-${day}`)

    if (!result[newDate]) result[newDate] = []
    result[newDate].push(chat)
  }

  return result
}

const createTimeForHuman = (time) => {
  const f = new Intl.RelativeTimeFormat('id-ID', {
    style: 'long',
    numeric: 'auto',
  })
  const today = new Date()
  const before = new Date(time)
  const minDay = before.getDate() - today.getDate()
  if (minDay > 0 || minDay < -7) return formatterTimeDivisionDate.format(before)
  else if (minDay <= -3 && minDay >= -7)
    return formatterTimeDivisionDay.format(before)
  else if (minDay <= 0 && minDay >= -2) return f.format(minDay, 'days')
}

const formatterTimeChat = new Intl.DateTimeFormat('id-ID', {
  hour: '2-digit',
  minute: '2-digit',
})

const formatterTimeDivisionDate = new Intl.DateTimeFormat('id-ID', {
  month: 'long',
  day: '2-digit',
  year: 'numeric',
})
const formatterTimeDivisionDay = new Intl.DateTimeFormat('id-ID', {
  weekday: 'long',
})

export {
  getFromLocalStorage,
  setFromLocalStorage,
  formatterTimeChat,
  createChatAndTime,
  createTimeForHuman,
  deleteLocalStorage,
}
