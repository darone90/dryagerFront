import React, { ChangeEvent, useEffect, useState, useContext } from 'react';
import { getData } from '../../global/function';
import { HumiData } from '../../types/incomeTypes';
import { address } from '../../global/address';

import { ControllContext } from '../../App';

import Manometer from '../common/manometer/Manometer';
import Button from '../common/button/Button';

interface Props {
    humi: number
}

const initialState = {
    humiSetPoint: 0,
    humiTolleracne: 0,
    humiActiveTime: 0,
    humiInterval: 0
}

const Humidity = (props: Props) => {

    const context = useContext(ControllContext);

    const [actualHumi, setActualHumi] = useState<HumiData>(initialState);
    const [newActulaHumi, setNewActualHumi] = useState<HumiData>(initialState);

    useEffect(() => {
        (async () => {
            const data = await getData('humidity');
            setActualHumi(data);
            setNewActualHumi(data);
        })()
    }, [])

    const actualizeData = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setNewActualHumi(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const updateHandler = async () => {
        await fetch(`${address}/humidity`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newActulaHumi)
        })
        setActualHumi(newActulaHumi)
    }

    return (
        <div>
            <h2>Właściwości wilgotności</h2>
            <strong>Aktualna wilgotność</strong>
            <Manometer degree={props.humi} />
            {context?.control ?
                null
                : <>
                    <strong>Wilgotność wartość zadana:</strong>
            <div>
                <label>
                    Podaj wartość zadaną
                    <input type="number" value={newActulaHumi.humiSetPoint} name='humiSetPoint' onChange={e => actualizeData(e)} />
                </label>
                <p>Aktualna zadana wartość</p>
                <div>{actualHumi.humiSetPoint}</div>
            </div>
            <strong>Tolerancja wartość zadana</strong>
            <div>
                <label>
                    Podaj wartość zadaną
                    <input type="number" value={newActulaHumi.humiTolleracne} name='humiTolleracne' onChange={e => actualizeData(e)} />
                </label>
                <p>Aktualna zadana wartość</p>
                <div>{actualHumi.humiTolleracne}</div>
            </div>
            <strong>Czas nawilżania:</strong>
            <div>
                <label>
                    Podaj wartość zadaną
                    <input type="number" value={newActulaHumi.humiActiveTime} name='humiActiveTime' onChange={e => actualizeData(e)} />
                </label>
                <p>Aktualna zadana wartość</p>
                <div>{actualHumi.humiActiveTime}</div>
            </div>
            <strong>Interwał reakcyjny:</strong>
            <div>
                <label>
                    Podaj wartość zadaną
                    <input type="number" value={newActulaHumi.humiInterval} name='humiInterval' onChange={e => actualizeData(e)} />
                </label>
                <p>Aktualna zadana wartość</p>
                <div>{actualHumi.humiInterval}</div>
            </div>
            <Button name="Zapisz zmiany" func={updateHandler} />
                </>}
        </div>
    );
};

export default Humidity;

