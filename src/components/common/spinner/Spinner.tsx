import * as React from 'react';

import './spinner.css'

const Spinner = () => {
    return (
        <div className='Spinner'>
            <div className="Spinner__loader">
                <div className="Spinner__loader_inner one"></div>
                <div className="Spinner__loader_inner two"></div>
                <div className="Spinner__loader_inner three"></div>
            </div>
        </div>
    )
}

export default Spinner