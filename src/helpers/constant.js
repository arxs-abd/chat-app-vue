const config = {
  url: {
    api: import.meta.env.VITE_BASE_URL,
  },
  pusher: {
    api_key: import.meta.env.VITE_PUSHER_API_KEY,
    cluster: import.meta.env.VITE_PUSHER_CLUSTER,
    auth_url: import.meta.env.VITE_PUSHER_AUTH_URL,
  },
}
export { config }
