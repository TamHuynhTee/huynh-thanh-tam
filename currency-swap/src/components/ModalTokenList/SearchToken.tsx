// import React from 'react';
import cn from 'clsx';
import { useEffect, useRef } from 'react';
import close_icon from '/icons/icon_close.svg';
import { useTokenStore } from '../../stores/tokens.ts';
import { useDebounce } from '../../utils';
import style from './style.module.css';

const SearchToken = () => {
  const searchToken = useTokenStore((state) => state.searchToken);
  const clearSearch = useTokenStore((state) => state.clearSearch);
  const modalOpen = useTokenStore((state) => state.modalOpen);
  const inputRef = useRef<HTMLInputElement>(null);

  const debounceSearchToken = useDebounce((e) => {
    const value = e.target.value;
    searchToken(value);
  });

  const onClearSearch = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      clearSearch();
    }
  };

  useEffect(() => {
    if (!modalOpen && inputRef.current) inputRef.current.value = '';
  }, [modalOpen]);

  return (
    <div className={cn(style['search-token'])}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search name token"
        onChange={debounceSearchToken}
      />
      <button
        className={cn(style['clear'], 'image-wrapper')}
        onClick={onClearSearch}
      >
        <img src={close_icon} alt="clear" />
      </button>
    </div>
  );
};

export default SearchToken;
