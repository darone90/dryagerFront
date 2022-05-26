import * as React from 'react';
import { Income } from '../../types/incomeTypes';
import { address } from '../../global/address';
import { getData } from '../../global/function';

interface Props {
    data: Income
}

const Devices = (props: Props) => {

    const { data } = props;

    const [manual, setManual] = React.useState<boolean>(false);
    const [isProcessStart, setIsProcessStart] = React.useState<boolean>(true);
    const [loop, setLoop] = React.useState<number>(0);
    const [newLoop, setNewLoop] = React.useState<number>(0);

    React.useEffect(() => {
        (async () => {
            const data = await getData('loop');
            setIsProcessStart(data.process);
            setLoop(Number(data.loop))
        })()
    }, [])

    const processHandle = async (action: string) => {

        await fetch(`${address}/process/${action}`)
        if (action === 'restart') return;
        setIsProcessStart(prev => !prev);
    }

    const devicesHandle = async (device: string, action: string) => {
        await fetch(`${address}/devices/${device}/${action}`)
    }

    const allStop = async (action: boolean) => {
        await fetch(`${address}/devices/all/stop`)
    }

    const updateLoop = async () => {
        await fetch(`${address}/loop`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ loop: newLoop })
        })
    }

    return (
        <div>
            <div className={manual ? '_manual' : '_auto'}>{manual ? 'Tryb ręczny' : 'Tryb automatyczny'}</div>
            <div>
                <p>Aktualny czas pętli:{loop}</p>
                <label>Nowy czas pętli: <input type="number" value={newLoop} onChange={(e => setNewLoop(Number(e.target.value)))} /></label>
                <button onClick={updateLoop}>Zapisz</button>
            </div>
            <div>
                <button disabled={!isProcessStart} onClick={() => processHandle('start')}>Proces start</button>
                <button disabled={isProcessStart} onClick={() => processHandle('stop')}>Proces stop</button>
                <button disabled={!isProcessStart} onClick={() => processHandle('restart')}>Proces restart</button>
                <button onClick={() => {
                    setManual(prev => !prev);
                    processHandle(manual ? 'start' : 'stop')
                    allStop(manual ? true : false);
                }}>{manual ? 'Włącz tryb auto' : 'Włącz tryb ręcny'}</button>
            </div>
            <div>
                <label>
                    Układ chłodzenia 1 <div className={data.coolingModule1}>{data.coolingModule1}</div>
                </label>
                <label>
                    Układ chłodzenia 2 <div className={data.coolingModule2}>{data.coolingModule2}</div>
                </label>
                <label>
                    Układ nawilżania <div className={data.pumpModule}>{data.pumpModule}</div>
                </label>
                <label>
                    Przedmuch <div className={data.ventModule}>{data.ventModule}</div>
                </label>
                <label>
                    Suszenie <div className={data.drying}>{data.drying}</div>
                </label>
            </div>
            {manual ?
                <div>
                    <button onClick={() => devicesHandle('cool1', 'start')}>Załącz układ chłodzenia 1</button>
                    <button onClick={() => devicesHandle('cool1', 'stop')}>Wyłącz układ chłodzenia 1</button>
                    <button onClick={() => devicesHandle('cool2', 'start')}>Załącz układ chłodzenia 2</button>
                    <button onClick={() => devicesHandle('cool2', 'stop')}>Wyłącz układ chłodzenia 2</button>
                    <button onClick={() => devicesHandle('pomp', 'start')}>Załącz układ nawilżania</button>
                    <button onClick={() => devicesHandle('pomp', 'stop')}>Wyłącz układ nawilżania</button>
                    <button onClick={() => devicesHandle('vent', 'start')}>Załącz układ wentylacji</button>
                    <button onClick={() => devicesHandle('vent', 'stop')}>Wyłącz układ wentylacji</button>
                </div>
                : null
            }
        </div>
    )
}

export default Devices;