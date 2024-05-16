import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTimetable } from './timetable.hook';
import { FallbackDisplay } from '../misc/fallbackDisplay';
import { Stop } from '../../types';
import { convertSecondsToHoursAndMinutes, formatSeconds } from './utils.hsl';

const currentEpochTime = new Date().getTime() / 1000; // Divide by 1000 to convert milliseconds to seconds
const layout = {
  single: {
    xs: 12,
    columns: 24,
    childSize: 6
  },
  double: {
    xs: 6,
    columns: 12,
    childSize: 12
  },
}
export function HslTimeTable({ stationId, numberOfDepartures, layoutType }: HslProps) {
  const timetable = useTimetable(
    stationId,
    currentEpochTime,
    numberOfDepartures
  );

  const { data, fetching, error } = timetable;
  if (fetching || error) return <FallbackDisplay text={'N/A'} />;

  const { desc, stoptimesWithoutPatterns } =
    data?.stop || ({} as Stop);

  return (
    <Grid xs={layout[layoutType].xs} className="timetable">
      <Typography className="Info__title Info__title--center">
        {desc}
      </Typography>
      <Grid container columns={layout[layoutType].columns}>
        {stoptimesWithoutPatterns.map((stop, i) => {
          const {
            trip: { route },
            scheduledArrival,
            arrivalDelay,
          } = stop;
          const { hours, minutes } =
            convertSecondsToHoursAndMinutes(scheduledArrival);

          return (
            <Grid container item xs={layout[layoutType].childSize}>
              <Grid item xs={4}>
                <Typography className="timetable__content homey-left">
                  {route.shortName}
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                alignItems={'center'}
                justifyContent={'center'}
                display={'flex'}
              >
                <Typography className="timetable__delay">
                  {arrivalDelay === 0 ? '--' : `${formatSeconds(arrivalDelay)}`}
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography className="timetable__content homey-right">
                  {`${hours}:${minutes}`}
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}

interface HslProps {
  stationId: string;
  numberOfDepartures: number;
  layoutType: 'single' | 'double';
}
