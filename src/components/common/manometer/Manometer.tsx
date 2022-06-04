import React from 'react';
import Clock from './components/clock/Clock';

interface Props {
  degree: number
}

const Manometer = (props: Props) => {

  return (
    <div className='__Mano'>
      <Clock deg={props.degree} />
    </div>
  );
};

export default Manometer;
