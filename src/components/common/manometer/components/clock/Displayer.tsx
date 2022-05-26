import React from 'react';
import '../../style/displayer.css';

interface Props {
    percent: number
}
const Displayer = (props: Props) => {
    return (
        <div className='clock-digit'>
            <strong>{Number(props.percent).toFixed(1)}</strong>
        </div>
    );
};

export default Displayer;