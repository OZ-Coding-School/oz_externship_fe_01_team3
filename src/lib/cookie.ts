import Cookies from 'js-cookie'

export const cookie = {
  get: (name: string) => Cookies.get(name),
  set: (name: string, value: string, days?: number) =>
    Cookies.set(name, value, { expires: days || 7 }),
  delete: (name: string) => Cookies.remove(name),
}
