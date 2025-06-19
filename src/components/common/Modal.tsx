// components
import ReactDOM from 'react-dom'

const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  const el = document.getElementById('modal')
  return ReactDOM.createPortal(children, el as Element)
}

export default ModalPortal
