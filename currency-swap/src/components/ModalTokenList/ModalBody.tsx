// import React from 'react';
import { SWAP_FORM_NAMES } from '@/constants/form-names.ts';
import useExchangeCalculation from '@/hooks/useExchangeCalculation.ts';
import { Token } from '@/interfaces/index.ts';
import cn from 'clsx';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTokenStore } from '../../stores/tokens.ts';
import Loading from '../Loading';
import SearchToken from './SearchToken';
import TokenItem from './TokenItem';
import style from './style.module.css';

const ModalBody = () => {
  const list = useTokenStore((state) => state.list);
  const modalKey = useTokenStore((state) => state.modalKey);
  const loading = useTokenStore((state) => state.loading);
  const closeModal = useTokenStore((state) => state.closeModal);
  const form = useFormContext<any>();

  const isEmpty = list.length === 0;

  const { calculateBaseOnName } = useExchangeCalculation({ form });

  const onItemClick = useCallback(
    (token: Token) => {
      const oppositeKey =
        modalKey === SWAP_FORM_NAMES.fromToken
          ? SWAP_FORM_NAMES.toToken
          : SWAP_FORM_NAMES.fromToken;

      const oppositeValue = form.getValues(oppositeKey) as Token;

      if (oppositeValue?.currency !== token.currency) {
        form.setValue(modalKey, token);

        const calculateKey =
          modalKey === SWAP_FORM_NAMES.fromToken ? 'from' : 'to';

        calculateBaseOnName(calculateKey);

        form.clearErrors(modalKey);
      }
      closeModal();
    },
    [modalKey]
  );

  return (
    <div className={cn(style['modal-body'])}>
      <SearchToken />
      <div className={cn(style['list-tokens'])}>
        {loading ? (
          <Loading />
        ) : isEmpty ? (
          'No token found.'
        ) : (
          list.map((token, index) => (
            <TokenItem
              key={index}
              token={token}
              onItemClick={() => onItemClick(token)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ModalBody;
