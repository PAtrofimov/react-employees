import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
   visible: boolean,
   title: string,
   content: string,
   btn_caption: string,
   onClose: () => void
}

const Portal = ({children}:{children:any}) => {

   const el = document.createElement('div');

   useEffect(() => {
      document.body.appendChild(el);

      return () => {
         document.body.removeChild(el);
      }
   }, [el]);
   return ReactDOM.createPortal(children, el);
}

const Modal = ({
   visible = false,
   title,
   content,
   btn_caption,
   onClose,
}: ModalProps) => {
    const onKeydown = ({ key }: KeyboardEvent) => {
      switch (key) {
         case 'Escape':
            onClose();
            break;
      }
   }

   React.useEffect(() => {
      document.addEventListener('keydown', onKeydown)
      return () => document.removeEventListener('keydown', onKeydown)
   })

   if (!visible) return null;

   return (
      <Portal>
      <div className="modalDialog">
         <div className="modalDialog__content">
            <header className="modalDialog__header">
               <h2 className="modalDialog__title">{title}</h2>
               <button title="Закрыть" className="close" onClick={onClose}>x</button>
            </header>

            <p className="modalDialog__text">
               {content}
            </p>
            <div className="modalDialog__actions">
               <button className="modalDialog__btn btn" onClick={onClose} >{btn_caption}</button>
            </div>
         </div>
      </div>
      </Portal>
   )
}
export default Modal;
