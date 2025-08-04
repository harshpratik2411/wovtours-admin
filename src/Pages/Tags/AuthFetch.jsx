
import APIService from '../APIServices'

let isRefreshing = false
let refreshSubscribers = []

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb)
}

function onRefreshed(token) {
  refreshSubscribers.forEach((cb) => cb(token))
  refreshSubscribers = []
}

async function fetchWithAuth(url, options = {}) {
  let accessToken = localStorage.getItem('accessToken')

  options.headers = {
    ...(options.headers || {}),
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  }

  let response = await fetch(url, options)

  if (response.status === 401) {
    // Try to refresh token
    if (!isRefreshing) {
      isRefreshing = true
      try {
        const refreshToken = localStorage.getItem('refreshToken')
        const refreshResponse = await fetch(APIService.baseUrl + 'api/token/refresh/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh: refreshToken }),
        })

        if (!refreshResponse.ok) throw new Error('Failed to refresh token')

        const data = await refreshResponse.json()
        localStorage.setItem('accessToken', data.access)
        isRefreshing = false
        onRefreshed(data.access)
      } catch (error) {
        isRefreshing = false
        // If refresh fails, logout
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
        return response
      }
    }

    // Wait for new token before retrying
    return new Promise((resolve) => {
      subscribeTokenRefresh(async (newToken) => {
        options.headers['Authorization'] = 'Bearer ' + newToken
        const retryResponse = await fetch(url, options)
        resolve(retryResponse)
      })
    })
  }

  return response
}

export default fetchWithAuth
