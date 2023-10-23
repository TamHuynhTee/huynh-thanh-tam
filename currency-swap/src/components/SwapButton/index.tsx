import cn from 'clsx';
import style from './style.module.css';
import icon_swap from '/icons/icon_swap.svg';

type Props = {
  onClick: () => void;
};

const SwapButton = ({ onClick }: Props) => {
  return (
    <div className={cn(style['swap-button'])}>
      <button type="button" className="image-wrapper" onClick={onClick}>
        <img src={icon_swap} alt="swap" />
      </button>
    </div>
  );
};

export default SwapButton;
