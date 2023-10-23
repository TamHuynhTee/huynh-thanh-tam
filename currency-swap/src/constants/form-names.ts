import { Token } from '@/interfaces';

export type SWAP_FORM_NAMES_TYPE = {
  from: number;
  to: number;
  fromToken: Token;
  toToken: Token;
};
export const SWAP_FORM_NAMES = {
  from: 'from',
  to: 'to',
  fromToken: 'fromToken',
  toToken: 'toToken',
};
