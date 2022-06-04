import React, { useEffect, useState, createContext } from 'react';
import { w3cwebsocket } from "websocket";
import { key } from './app.config';

import './app.css'

import { Income } from './types/incomeTypes';
import { Context } from './types/contextTypes';

import Devices from './components/layouts/Devices';
import Temperature from './components/layouts/Temperature';
import Humidity from './components/layouts/Humidity';
import Video from './components/layouts/Video';
import Spinner from './components/common/spinner/Spinner';

const client = new w3cwebsocket('ws://192.168.8.155:3030', `dryager-protocol-${key}`);

export const ControllContext = createContext<Context | null>(null);

function App() {

  const [income, setIncome] = useState<Income | null>(null);
  const [control, setControl] = useState<boolean>(false)


  useEffect(() => {
    client.onopen = () => {
      console.log('connection aproved')
    }

    client.onmessage = (message) => {
      const data = JSON.parse(message.data as string);
      setIncome(data);
    }

  })

  const setControlType = (controlType: boolean): void => {
    setControl(controlType)
  }

  if (!income) return <Spinner />

  return (
    <>
      <ControllContext.Provider value={{
        control,
        setControlType
      }}>
        <div className='Main-windows-wrap'>
          <Temperature temp={Number(income.message.substring(0, 4))} />
          <Devices data={income} />
          <Humidity humi={Number(income.message.substring(5, 9))} />
          <Video />
        </div>
      </ControllContext.Provider>
    </>
  );
}

export default App;
