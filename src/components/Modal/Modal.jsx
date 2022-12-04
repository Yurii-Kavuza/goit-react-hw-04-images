import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, Content } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ largeImage, desc, onClose, clearImage }) => {
  const modalClose = useCallback(() => {
    onClose();
    clearImage();
  }, [clearImage, onClose]);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        modalClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
      clearImage();
    }
  };

  return createPortal(
    <Backdrop onClick={handleBackdropClick}>
      <Content>
        <img src={largeImage} alt={desc} />
      </Content>
    </Backdrop>,
    modalRoot
  );
};

export default Modal;
