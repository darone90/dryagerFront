import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { address } from '../../global/address';

interface colors {
    red: number;
    green: number;
    blue: number
}

const initialState = {
    red: 127,
    green: 127,
    blue: 127
}

const Video = () => {

    const [isVideoOn, setIsVideoOn] = useState<boolean>(false);
    const [colors, setColors] = useState<colors>(initialState)

    const camera = async (action: string): Promise<void> => {
        await fetch(`${address}/camera/${action}`)
        if (action === 'start') { setIsVideoOn(true) } else { setIsVideoOn(false) }
    }

    const actualizeData = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setColors(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const colorChange = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        await fetch(`${address}/light/${255 - colors.red}/${255 - colors.green}/${255 - colors.blue}`)
    }

    return (
        <>

            <h2>Moduł kamery:</h2>
            <button onClick={() => camera('start')}>Podgląd</button>
            <button onClick={() => camera('stop')}>Zatrzymaj</button>
            {isVideoOn ?
                <>
                <img src='http://192.168.8.155:3040/stream.mjpg' alt='videostream' style={{ height: '100px', width: '100px', border: '1px solid black', display: 'block' }} />
                    <div>
                        <label>
                            Zielony:
                            <input type="range" name="green" min='1' max='255' onChange={actualizeData} />
                        </label>
                        <label>
                            Czerwony:
                            <input type="range" name="red" min='1' max='255' onChange={actualizeData} />
                        </label>
                        <label>
                            Niebieski:
                            <input type="range" name="blue" min='1' max='255' onChange={actualizeData} />
                        </label>
                        <button onClick={colorChange}>Wprowadź kolory</button>
                    </div>
                </>
                : null
            }
        </>

    )
}

export default Video