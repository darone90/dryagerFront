import React from 'react';
import './Button.css'

interface Props {
    name: string
    func: () => void
}

const Button = (props: Props) => {
    return (
        <button onClick={props.func} className='Button-global'>{props.name}</button>
    )
}

export default Button