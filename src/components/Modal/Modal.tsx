import React, {Children, FC, PropsWithChildren, ReactElement} from 'react';
import styles from './Modal.module.scss';
import TransitionContainer from "../TransitionContainer";

interface ModalProps {
  isVisible: boolean
  backgroundClick: () => void
  timeout: number
}

const Modal: FC<ModalProps> = ({ isVisible, backgroundClick, children, timeout }) => {
  const handleSetVisible = () => {
    backgroundClick()
  }

  return (
   <TransitionContainer state={isVisible} timeout={timeout}>
     <div className={styles.modal}>
       <div
         className={styles.modal__background}
         onClick={handleSetVisible}
       />
       <div className={styles.modal__content}>
         <div className={styles.dialog}>
           {Children.map(children, (child) => {
             const childElement = child as ReactElement<PropsWithChildren<any>>

             return React.cloneElement(childElement, { handleCloseModal: handleSetVisible });
           })}
         </div>
       </div>
     </div>
   </TransitionContainer>
  );
};

export default Modal;
