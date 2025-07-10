import { authHandlers } from './auth'
import { exampleHandlers } from './example'

export const handlers = [...authHandlers, ...exampleHandlers]
