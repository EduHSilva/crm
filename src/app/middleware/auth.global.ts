import { useUser } from '~/plugins/userService'

export default defineNuxtRouteMiddleware(async (to) => {
  const URLS_NO_LOGIN = [
    '/login',
    '/register',
    '/'
  ]
  const token = useCookie('token').value

  if (URLS_NO_LOGIN.includes(to.path)) {
    if (token) return navigateTo('/home')
    return
  }
  const user = useUser()
  const { $userService } = useNuxtApp()

  if (user.value) return
  try {
    user.value = await $userService.getUser()
  } catch (e) {
    console.log(e)
    return navigateTo('/login')
  }
})
