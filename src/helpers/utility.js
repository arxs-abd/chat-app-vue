const getFromLocalStorage = (key, falseResult = []) => {
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : falseResult
}

const setFromLocalStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value))
}

let formatterTimeChat = new Intl.DateTimeFormat('id-ID', {
  hour: '2-digit',
  minute: '2-digit',
})

let formatterTimeDivisionDate = new Intl.DateTimeFormat('id-ID', {
  month: 'long',
  day: '2-digit',
  year: 'numeric',
})
let formatterTimeDivisionDay = new Intl.DateTimeFormat('id-ID', {
  weekday: 'long',
})

export { getFromLocalStorage, setFromLocalStorage, formatterTimeChat }
