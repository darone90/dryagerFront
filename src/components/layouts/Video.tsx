import React, { useState } from 'react';
import { address } from '../../global/address';

const Video = () => {

    const [isVideoOn, setIsVideoOn] = useState<boolean>(false)

    const camera = async (action: string): Promise<void> => {
        await fetch(`${address}/camera/${action}`)
        if (action === 'start') { setIsVideoOn(true) } else { setIsVideoOn(false) }
    }

    return (
        <>

            <h2>Moduł kamery:</h2>
            <button onClick={() => camera('start')}>Podgląd</button>
            <button onClick={() => camera('stop')}>Zatrzymaj</button>
            {isVideoOn ?
                <img src='http://192.168.8.155:3040/stream.mjpg' alt='videostream' style={{ height: '100px', width: '100px', border: '1px solid black', display: 'block' }} />
                : null
            }
        </>

    )
}

export default Video