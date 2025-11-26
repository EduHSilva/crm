export function getTokenCookie() {
  return useCookie<{ token: string | null } | null>('token1')
}

export function formatCurrency(locale: string, value: number) {
  if (locale == 'en') {
    return 'U$ ' + value.toFixed(2)
  }
  return 'R$ ' + value.toFixed(2)
}
