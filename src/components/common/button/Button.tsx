import React from 'react';

interface Props {
    name: string
    func: () => void
}

const Button = (props: Props) => {
    return (
        <button onClick={props.func}>{props.name}</button>
    )
}

export default Button