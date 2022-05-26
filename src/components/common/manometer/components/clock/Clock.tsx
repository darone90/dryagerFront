import React from 'react';
import ClockHand from './ClockHand';
import Displayer from './Displayer';

import '../../style/clock.css';

interface Props {
    deg: number
}

const Clock = (props: Props) => {
    return (
        <div className='clock'>
            <ClockHand deg={props.deg} />
            <Displayer percent={props.deg} />
            <div className='clock__screw --first'></div>
            <div className='clock__screw --second'></div>
        </div>
    );
};

export default Clock;