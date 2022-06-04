import React, { useState, useEffect, ChangeEvent, useContext } from 'react';

import { getData } from '../../global/function';
import { address } from '../../global/address';

import { AirData } from '../../types/incomeTypes';

import { ControllContext } from '../../App';

import Button from '../common/button/Button';

const initialState = {
    ventInterval: 0,
    ventTime: 0,
    dry: 0
}

const Air = () => {

    const context = useContext(ControllContext);

    const [actualAir, setActualAir] = useState<AirData>(initialState);
    const [newActulaAir, setNewActualAir] = useState<AirData>(initialState);

    useEffect(() => {
        (async () => {
            const data = await getData('air');
            setActualAir(data);
            setNewActualAir(data);
        })()
    }, [])

    const actualizeData = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setNewActualAir(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const updateHandler = async () => {
        await fetch(`${address}/air`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newActulaAir)
        })
        setActualAir(newActulaAir)
    }


    return (
        <div className='Air'>
            <h2>Właściwości predmuchu i suszenia</h2>
            {context?.control ?
                null
                : <div className='Air__parameters'>
                    <strong>Wymiana powietrza:</strong>
                    <div>
                        <label>
                            Podaj wartość zadaną
                            <input type="number" value={newActulaAir.ventInterval} name='ventInterval' onChange={e => actualizeData(e)} />
                        </label>
                        <p>Aktualna zadana wartość</p>
                        <div>{actualAir.ventInterval}</div>
                    </div>
                    <strong>Czas przedmuchu</strong>
                    <div>
                        <label>
                            Podaj wartość zadaną
                            <input type="number" value={newActulaAir.ventTime} name='ventTime' onChange={e => actualizeData(e)} />
                        </label>
                        <p>Aktualna zadana wartość</p>
                        <div>{actualAir.ventTime}</div>
                    </div>
                    <strong>Czas suszenia</strong>
                    <div>
                        <label>
                            Podaj wartość zadaną
                            <input type="number" value={newActulaAir.dry} name='dry' onChange={e => actualizeData(e)} />
                        </label>
                        <p>Aktualna zadana wartość</p>
                        <div>{actualAir.dry}</div>
                    </div>
                    <Button name="Zapisz zmiany" func={updateHandler} />
                </div>}
        </div>
    );
};

export default Air;