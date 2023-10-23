import { SWAP_FORM_NAMES_TYPE } from '@/constants/form-names';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

// type Props = {};

const useExchangeCalculation = ({
  form,
}: {
  form: UseFormReturn<SWAP_FORM_NAMES_TYPE>;
}) => {
  const [loading, setLoading] = useState(false);
  const { getValues, setValue, trigger } = form;

  const calculateExchange = (
    toPrice: number,
    fromPrice: number,
    fromRate: number
  ): number => {
    const exchange = fromPrice / toPrice;

    return exchange * fromRate;
  };

  const calculateBaseOnName = (name: 'from' | 'to') => {
    setLoading(true);
    setTimeout(() => {
      try {
        const { fromToken, toToken, from, to } = getValues();
        if (!fromToken) return trigger('fromToken');
        if (!toToken) return trigger('toToken');
        if (from < 0) return trigger('from');
        if (to < 0) return trigger('to');
        switch (name) {
          case 'from': {
            const cal = calculateExchange(toToken.price, fromToken.price, from);
            setValue('to', cal);
            break;
          }
          case 'to': {
            const cal = calculateExchange(fromToken.price, toToken.price, to);
            setValue('from', cal);
            break;
          }
          default:
            break;
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  return { calculateExchange, calculateBaseOnName, loading };
};

export default useExchangeCalculation;
