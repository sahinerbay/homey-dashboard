import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import { useState } from 'react';
import Homey from './components/homey/index.homey';
import Weather from './components/weather/index.weather';
import InfoPanel from './components/navigation/index.navigation';
import HeaderNav from './components/navigation/header.navigation';

import {
  DayLength,
  HomeyModeInfo,
  HomeyUserPresence,
  HomeyCapabilitiesExtended,
} from './types';

function Main() {
  const [dayLength, setDayLength] = useState<DayLength | null>(null);

  const [modes, setModes] = useState<HomeyModeInfo | null>(null);
  const [userPresence, setUserPresence] = useState<
    HomeyUserPresence[] | null
  >(null);
  const [outdoorSensor, setOutdoorSensor] =
    useState<HomeyCapabilitiesExtended | null>(null);

  return (
    <div className="App">
      <HeaderNav 
        modes={modes}
        userPresence={userPresence}
      />
      <InfoPanel dayLength={dayLength} />
      <Weather
        setDayLength={setDayLength}
        outdoorSensor={outdoorSensor}
      />
      <Homey
        setModes={setModes}
        setUserPresence={setUserPresence}
        setOutdoorSensor={setOutdoorSensor}
      />
    </div>
  );
}

export default Main;
