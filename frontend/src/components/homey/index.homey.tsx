import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Zone } from './zones/index.zones';
import { FallbackDisplay } from './../misc/fallbackDisplay';
import {
  HomeyDevicesPerZone,
  HomeyModeInfo,
  HomeyUserPresence,
  HomeyCapabilitiesExtended,
} from '../../types';

export default function Homey({
  setModes,
  setUserPresence,
  setOutdoorSensor,
}: HomeyProps) {
  const [homeyData, setHomeyData] =
    useState<HomeyDevicesPerZone | null>(null);

  const backendUrl = `${process.env.REACT_APP_LOCAL_API_URL}:${process.env.REACT_APP_LOCAL_API_PORT}`;

  useEffect(() => {
    fetch(`${backendUrl}/devices`)
      .then((response) => response.json())
      .then((json) => {
        setHomeyData(json.devices);
        setModes(json.misc.modes);
        setUserPresence(json.misc.users);
        setOutdoorSensor(json.misc.outdoorSensor);
      })
      .catch((error) => console.error(error));
  }, []);

  if (homeyData === null) return <FallbackDisplay text={'N/A'} />;

  const zones = Object.keys(homeyData);

  return (
    // #Homey used when Puppeteer takes screenshot
    <Grid container m={0} columns={15} id="Homey">
      {zones.map((zone) => {
        return (
          <Zone zoneName={zone} zoneDeviceList={homeyData[zone]} />
        );
      })}
    </Grid>
  );
}

interface HomeyProps {
  setModes: (modes: HomeyModeInfo) => void;
  setUserPresence: (userPresence: HomeyUserPresence[]) => void;
  setOutdoorSensor: (
    outdoorSensor: HomeyCapabilitiesExtended
  ) => void;
}
