import React from 'react';
import '../../style/clockHand.css';

interface Props {
    deg: number
}

const ClockHand = (props: Props) => {
    return (
        <div className='clock-hand' style={{ rotate: `${1.8 * props.deg}deg` }}>
            <div className='clock-hand__dot'></div>
        </div>
    );
};

export default ClockHand;