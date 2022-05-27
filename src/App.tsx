import React, { useEffect, useState } from 'react';
import { w3cwebsocket } from "websocket";

import { Income } from './types/incomeTypes';

import Devices from './components/layouts/Devices';
import Temperature from './components/layouts/Temperature';
import Humidity from './components/layouts/Humidity';
import Spinner from './components/common/spinner/Spinner';

const client = new w3cwebsocket('ws://192.168.8.155:3030', 'dryager-protocol');


function App() {

  const [income, setIncome] = useState<Income | null>(null);


  useEffect(() => {
    client.onopen = () => {
      console.log('connection aproved')

    }

    client.onmessage = (message) => {
      const data = JSON.parse(message.data as string);
      setIncome(data);
    }

  })

  if (!income) return <Spinner />
  return (
    <>
      <Devices data={income} />
      <Temperature temp={Number(income.message.substring(0, 4))} />
      <Humidity humi={Number(income.message.substring(5, 9))} />
    </>
  );
}

export default App;
