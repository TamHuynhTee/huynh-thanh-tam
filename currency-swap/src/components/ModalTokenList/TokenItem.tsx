import { TOKEN_ICONS } from '@/constants/tokens-icons.ts';

import { Token } from '@/interfaces';
import cn from 'clsx';
import style from './style.module.css';

const TokenItem = ({
  token,
  onItemClick,
}: {
  token: Token;
  onItemClick: () => void;
}) => {
  const tokenName = token.currency;
  return (
    <div className={cn(style['token-item'])} onClick={onItemClick}>
      <div className={cn(style['token-item--thumbnail'], 'image-wrapper')}>
        <img src={`${TOKEN_ICONS[tokenName]}`} alt="" />
      </div>
      <span>{tokenName}</span>
    </div>
  );
};

export default TokenItem;
