import React, { useContext, useEffect, useState } from 'react';
import { getData } from '../../global/function';
import { address } from '../../global/address';

import { ControllContext } from '../../App';

import Manometer from '../common/manometer/Manometer';
import Button from '../common/button/Button';

interface Props {
    temp: number;
}

const Temperature = (props: Props) => {

    const context = useContext(ControllContext);

    const [tempSet, setTempSet] = useState<number>(0);
    const [tempHis, setTempHis] = useState<number>(0);
    const [actualTempSet, setActualTempSet] = useState<number>(0);
    const [actualTempHis, setActualTempHis] = useState<number>(0);

    useEffect(() => {
        (async () => {
            const data = await getData('temperature');
            setActualTempSet(Number(data.tempSET));
            setActualTempHis(Number(data.tempHIS));
            setTempSet(Number(data.tempSET));
            setTempHis(Number(data.tempHIS));
        })()
    }, [])

    const sendData = async () => {
        const data = {
            tempSET: tempSet,
            tempHIS: tempHis
        }

        setActualTempSet(tempSet);
        setActualTempHis(tempHis);

        await fetch(`${address}/temperature`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })


    }

    return (
        <div className='Temperature'>
            <h2>Właściwości temperatury</h2>
            <strong>Aktualna temperatura</strong>
            <Manometer degree={props.temp} />
            {context?.control ?
                null
                : <>
                    <strong>Temperatura wartość zadana</strong>
                    <div>
                        <label>
                            Podaj wartość zadaną
                            <input type="number" value={tempSet} onChange={e => setTempSet(Number(e.target.value))} />
                        </label>
                        <p>Aktualna zadana wartość</p>
                        <div>{actualTempSet}</div>
                    </div>
                    <strong>Histereza wartość zadana</strong>
                    <div>
                        <label>
                            Podaj wartość zadaną
                            <input type="number" value={tempHis} onChange={e => setTempHis(Number(e.target.value))} />
                        </label>
                        <p>Aktualna zadana wartość</p>
                        <div>{actualTempHis}</div>
                    </div>
                    <Button name="Wprowadź zmiany" func={sendData} />
                </>
            }
        </div>
    )
}

export default Temperature