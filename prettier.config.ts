import { Config } from 'prettier'

const config: Config = {
  semi: true,
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  trailingComma: 'all',
  plugins: ['prettier-plugin-tailwindcss'],
}

export default config
