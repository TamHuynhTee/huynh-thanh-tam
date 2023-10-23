// import React from 'react';
import cn from 'clsx';
import style from './style.module.css';
import close_icon from '/icons/icon_close.svg';

const ModalHeader = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <div className={cn(style['modal-header'])}>
      <span>Select token</span>
      <button
        className={cn(style['modal-close-btn'], 'image-wrapper')}
        onClick={closeModal}
      >
        <img src={close_icon} alt="close" />
      </button>
    </div>
  );
};

export default ModalHeader;
