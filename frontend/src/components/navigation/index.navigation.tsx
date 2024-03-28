import Grid from '@mui/material/Grid';
import { HomeyMode } from './homeyMode.navigation';
import { HomeyPresence } from './homeyPresence.navigation';
import { DayDetails } from './dayDetails.navigation';
import { HslTimeTable } from '../hsl/timetable.hsl';
import {
  DayLength,
  HomeyModeInfo,
  HomeyUserPresence,
} from '../../types';
import { BorderStyle } from './../../tokens';

const STATION_ID_ARR = [
  process.env.REACT_APP_HSL_STOP_ID_FIRST,
  process.env.REACT_APP_HSL_STOP_ID_SECOND,
];

export default function InfoPanel({
  dayLength,
  modes,
  userPresence,
}: InfoPanelProps) {
  return (
    // #Info used when Puppeteer takes screenshot
    <Grid container m={0} columns={15} id="Info">
      <Grid
        item
        xs={3}
        border={BorderStyle}
        className="info__wrapper__center"
      >
        <HomeyPresence userPresence={userPresence} />
      </Grid>
      <Grid
        item
        xs={3}
        border={BorderStyle}
        className="info__wrapper__center"
      >
        <HomeyMode modes={modes} />
      </Grid>
      <Grid
        item
        xs={3}
        border={BorderStyle}
        className="info__wrapper__center"
      >
        <DayDetails dayLength={dayLength} />
      </Grid>
      <Grid item xs={6} border={BorderStyle}>
        <Grid container>
          {STATION_ID_ARR.map((stationId) => {
            return (
              <HslTimeTable key={stationId} stationId={stationId!} />
            );
          })}
        </Grid>
      </Grid>
      {/* <Grid item xs={3} border={BorderStyle}>
        <HomeyOutdoorSensor data={outdoorSensor} />
      </Grid>
      <Grid item xs={3} border={BorderStyle}>
        <WeatherUpdate updatedAt={updatedAt} />
      </Grid> */}
    </Grid>
  );
}

interface InfoPanelProps {
  dayLength: DayLength | null;
  modes: HomeyModeInfo | null;
  userPresence: HomeyUserPresence[] | null;
}
