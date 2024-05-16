import Grid from '@mui/material/Grid';
import { DayDetails } from './dayDetails.navigation';
import { HslTimeTable } from '../hsl/timetable.hsl';
import {
  DayLength,
} from '../../types';
import { BorderStyle } from './../../tokens';

const BUS_STATION_ID_ARR = [
  process.env.REACT_APP_HSL_STOP_ID_FIRST,
  process.env.REACT_APP_HSL_STOP_ID_SECOND,
];

const TRAIN_STATION_ID_ARR = [
  process.env.REACT_APP_HSL_TRAIN_STOP_ID,
];

export default function InfoPanel({ dayLength }: InfoPanelProps) {
  return (
    // #Info used when Puppeteer takes screenshot
    <Grid container m={0} columns={15} id="Info">
      <Grid
        item
        xs={3}
        className="info__wrapper__center"
        alignItems={'stretch'}
      >
        <DayDetails dayLength={dayLength} />
      </Grid>
      <Grid item xs={6} id="hsl-train" >
        <Grid container>
          {TRAIN_STATION_ID_ARR.map((id) => {
            return (
              <HslTimeTable key={id} stationId={id!} numberOfDepartures={4} layoutType='single' />
            );
          })}
        </Grid>
      </Grid>

      <Grid item xs={6}>
        <Grid container id="hsl-bus">
          {BUS_STATION_ID_ARR.map((id) => {
            return (
              <HslTimeTable key={id} stationId={id!} numberOfDepartures={2} layoutType='double' />
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

interface InfoPanelProps {
  dayLength: DayLength | null;
}
