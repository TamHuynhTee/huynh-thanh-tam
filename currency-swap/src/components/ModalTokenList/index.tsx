// import React from 'react';
import cn from 'clsx';
import { useEffect } from 'react';
import { useTokenStore } from '../../stores/tokens.ts';
import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';
import style from './style.module.css';

type Props = {};

const ModalTokenList = (props: Props) => {
  const fetchListTokenAsync = useTokenStore(
    (state) => state.fetchListTokenAsync
  );

  const modalOpen = useTokenStore((state) => state.modalOpen);
  const closeModal = useTokenStore((state) => state.closeModal);

  useEffect(() => {
    if (modalOpen) fetchListTokenAsync();
  }, [modalOpen]);

  useEffect(() => {
    const closeOnEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };

    document.addEventListener('keydown', closeOnEsc);

    return () => document.removeEventListener('keydown', closeOnEsc);
  }, []);

  return (
    <>
      <div
        className={cn({
          [style['modal-overlay']]: true,
          [style['is-active']]: modalOpen,
        })}
        onClick={closeModal}
      ></div>
      <div
        className={cn({
          [style['modal-wrapper']]: true,
          [style['is-active']]: modalOpen,
        })}
      >
        <ModalHeader closeModal={closeModal} />
        <ModalBody />
      </div>
    </>
  );
};

export default ModalTokenList;
