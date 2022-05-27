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
            setIsProcessStart(data.status);
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

    const allStop = async () => {
        await fetch(`${address}/devices/all/0`)
    }

    const updateLoop = async () => {
        await fetch(`${address}/loop`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ loop: newLoop })
        })
        setLoop(newLoop)
        setIsProcessStart(false)
        setManual(false)
    }

    const autoManualHandler = async () => {
        setManual(prev => !prev);
        if (isProcessStart && !manual) {
            await processHandle('stop')
        }
        if (!isProcessStart && manual) {
            await processHandle('start')
        }
        await allStop();
    }

    return (
        <div>
            <div className={manual ? '_manual' : '_auto'}>{manual ? 'Tryb ręczny' : 'Tryb automatyczny'}</div>
            <div className={isProcessStart ? '_process-run' : '_process-stoped'}>{isProcessStart ? 'Proces uruchomiony...' : 'Proces zatrzymany'}</div>
            <div>
                <p>Aktualny czas pętli:{loop}</p>
                <label>Nowy czas pętli: <input type="number" value={newLoop} onChange={(e => setNewLoop(Number(e.target.value)))} /></label>
                <button onClick={updateLoop}>Zapisz</button>
            </div>
            <div>
                <button disabled={isProcessStart || manual} onClick={() => processHandle('start')}>Proces start</button>
                <button disabled={!isProcessStart} onClick={() => processHandle('stop')}>Proces stop</button>
                <button disabled={!isProcessStart} onClick={() => processHandle('restart')}>Proces restart</button>
                <button
                    onClick={async () => { await autoManualHandler() }}>{manual ? 'Włącz tryb auto' : 'Włącz tryb ręczny'}</button>
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
                    <button onClick={() => devicesHandle('coolingModule1', '0')}>Załącz układ chłodzenia 1</button>
                    <button onClick={() => devicesHandle('coolingModule1', '1')}>Wyłącz układ chłodzenia 1</button>
                    <button onClick={() => devicesHandle('coolingModule2', '0')}>Załącz układ chłodzenia 2</button>
                    <button onClick={() => devicesHandle('coolingModule2', '1')}>Wyłącz układ chłodzenia 2</button>
                    <button onClick={() => devicesHandle('pumpModule', '0')}>Załącz układ nawilżania</button>
                    <button onClick={() => devicesHandle('pumpModule', '1')}>Wyłącz układ nawilżania</button>
                    <button onClick={() => devicesHandle('ventModule', '0')}>Załącz układ wentylacji</button>
                    <button onClick={() => devicesHandle('ventModule', '1')}>Wyłącz układ wentylacji</button>
                </div>
                : null
            }
        </div>
    )
}

export default Devices;