import React from 'react';
import style from './style.module.css';

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className={style['loader-wrapper']}>
      <div className={style['loader']}></div>
    </div>
  );
};

export default Loading;
