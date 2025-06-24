import ReactDOM from 'react-dom'

export const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  const el = document.getElementById('modal')!
  return ReactDOM.createPortal(children, el as Element)
}

/* [사용법] */
/* 
  <ModalPortal>
    <dialog open>
      <h1>Modal</h1>
      <button>Close</button>
    </dialog>
  </ModalPortal> 

  or

  <ModalPortal>
    <div>
      <h1>Modal</h1>
      <button>Close</button>
    </div>
  </ModalPortal>
*/
