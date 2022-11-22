import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, Content } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  modalClose = () => {
    this.props.onClose();
    this.props.clearImage();
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.modalClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.modalClose();
    }
  };

  render() {
    const { largeImage, desc } = this.props;
    return createPortal(
      <Backdrop onClick={this.handleBackdropClick}>
        <Content>
          <img src={largeImage} alt={desc} />
        </Content>
      </Backdrop>,
      modalRoot
    );
  }
}
