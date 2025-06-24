export type InputStatus =
  | 'default'
  | 'wrong'
  | 'correct'
  | 'textDefault'
  | 'disabled'
  | 'checked'

export type InputType = 'text' | 'checkbox' | 'radio'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  status?: InputStatus
  type: InputType
  name?: string
  message?: string
  classNames?: string
}
