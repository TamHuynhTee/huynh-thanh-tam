import style from './style.module.css';
import chevron_down_icon from '/icons/icon_bottom_chevron.svg';
import { useTokenStore } from '../../stores/tokens.ts';
import {
  FieldErrors,
  RegisterOptions,
  UseFormRegister,
  useFormContext,
} from 'react-hook-form';
import { Token } from '@/interfaces/index.ts';
import { TOKEN_ICONS } from '@/constants/tokens-icons.ts';
import cn from 'clsx';
// import { SWAP_FORM_NAMES_TYPE } from '@/constants/form-names.ts';
import { useRef } from 'react';

type Props = {
  label: string;
  name: string;
  selectName: string;
  register: UseFormRegister<any>;
  options?: RegisterOptions;
  selectOptions?: RegisterOptions;
  errors: FieldErrors<any>;
  onChange: (name: string, val: any) => void;
};

const SwapInputItem = ({
  label,
  name,
  register,
  options,
  selectOptions,
  selectName,
  errors,
  onChange,
}: Props) => {
  const openModal = useTokenStore((state) => state.openModal);
  const formContext = useFormContext();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register(name, options);

  const tokenSelectName = selectName;
  const token = formContext.watch(tokenSelectName) as Token;

  const containingError = errors[name] || errors[selectName];

  return (
    <>
      <div
        className={cn({
          [style['swap-form-input']]: true,
          [style['error']]: containingError,
        })}
      >
        <div className={style['input-section']}>
          <input
            {...rest}
            onChange={(e) => onChange(name, +e.target.value)}
            ref={(e) => {
              ref(e);
              inputRef.current = e;
            }}
            type="number"
            placeholder=""
            id={name}
            name={name}
          />
          <div className={style['label']}>
            <label htmlFor={name}>{label}</label>
          </div>
        </div>
        <div
          className={cn({
            [style['token-select']]: true,
            // [style['error']]: containingSelectError,
          })}
          onClick={() => openModal(tokenSelectName)}
        >
          <select hidden {...register(tokenSelectName, selectOptions)}></select>
          {token ? (
            <div className={style['token-info']}>
              <div className={cn(style['token-icon'], 'image-wrapper')}>
                <img src={TOKEN_ICONS[token.currency]} alt="" />
              </div>
              <span className={style['token-name']}>{token.currency}</span>
            </div>
          ) : (
            <span className={style['empty-token']}>Select a token</span>
          )}
          <span className={cn(style['select-icon'], 'image-wrapper')}>
            <img src={chevron_down_icon} alt="chevron-down-icon" />
          </span>
        </div>
      </div>
      {containingError?.message ? (
        <p className={style['error']}>{containingError.message.toString()}</p>
      ) : null}
    </>
  );
};

export default SwapInputItem;
