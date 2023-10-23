import {
  SWAP_FORM_NAMES,
  SWAP_FORM_NAMES_TYPE,
} from '@/constants/form-names.ts';
import { Token } from '@/interfaces';
import { useDebounce } from '@/utils/index.ts';
import { Suspense, lazy } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import LabelRow from '../LabelRow';
import SwapButton from '../SwapButton';
import SwapInputItem from '../SwapInputItem';
import useExchangeCalculation from '@/hooks/useExchangeCalculation.ts';
import Loading from '../Loading';

const LazyModalTokenList = lazy(() => import('../ModalTokenList'));

type Props = {};

const SwapForm = (props: Props) => {
  const methods = useForm<SWAP_FORM_NAMES_TYPE>();
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
    clearErrors,
  } = methods;

  const handleSwapTokens = () => {
    const { from, to, fromToken, toToken } = getValues();
    setValue('fromToken', toToken);
    setValue('toToken', fromToken);

    setValue('from', to);
    setValue('to', from);
  };
  const { calculateBaseOnName, loading } = useExchangeCalculation({
    form: methods,
  });

  const onChangeInput = useDebounce((name: 'from' | 'to', value: any) => {
    setValue(name, value);
    clearErrors(name);

    calculateBaseOnName(name);
  }, 300);

  return (
    <Suspense fallback={'...Loading'}>
      <FormProvider {...methods}>
        <form className="swap-form-wrapper">
          {loading ? (
            <div className="loading">
              <Loading />
            </div>
          ) : null}
          <h1 className="form-header">Currency swap</h1>
          <SwapInputItem
            label="From"
            errors={errors}
            name={SWAP_FORM_NAMES.from}
            selectName={SWAP_FORM_NAMES.fromToken}
            register={register}
            options={{
              min: {
                value: 0,
                message: 'Positive number only',
              },
            }}
            selectOptions={{
              required: {
                value: true,
                message: 'Pick a token',
              },
            }}
            onChange={onChangeInput}
          />
          <SwapButton onClick={handleSwapTokens} />
          <SwapInputItem
            label="To"
            errors={errors}
            name={SWAP_FORM_NAMES.to}
            selectName={SWAP_FORM_NAMES.toToken}
            register={register}
            options={{
              min: {
                value: 0,
                message: 'Positive number only',
              },
            }}
            selectOptions={{
              required: {
                value: true,
                message: 'Pick a token',
              },
            }}
            onChange={onChangeInput}
          />

          <div
            style={{
              margin: '24px 0',
            }}
          ></div>

          <PriceRow />
        </form>
        <LazyModalTokenList />
      </FormProvider>
    </Suspense>
  );
};

const PriceRow = () => {
  const form = useFormContext();

  const fromToken = form.watch(SWAP_FORM_NAMES.fromToken) as Token;
  const toToken = form.watch(SWAP_FORM_NAMES.toToken) as Token;

  if (!fromToken || !toToken) return '';
  const exchangeRate = fromToken.price / toToken.price;

  return (
    <LabelRow
      label="Price"
      value={
        <div className="flex">
          <span>
            1 {fromToken.currency} = {exchangeRate} {toToken.currency}
          </span>
        </div>
      }
    />
  );
};

export default SwapForm;
