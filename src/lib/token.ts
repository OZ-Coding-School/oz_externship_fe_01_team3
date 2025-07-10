import Cookies from 'js-cookie'

export const token = {
  get: () => Cookies.get('accessToken'),
  set: (value: string) => Cookies.set('accessToken', value, { expires: 7 }),
  delete: () => Cookies.remove('accessToken'),

  refresh: {
    get: () => Cookies.get('refreshToken'),
    set: (value: string) => Cookies.set('refreshToken', value, { expires: 7 }),
    delete: () => Cookies.remove('refreshToken'),
  },

  clear: () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
  },
}
