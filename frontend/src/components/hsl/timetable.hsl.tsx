import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTimetable } from './timetable.hook';
import { FallbackDisplay } from '../misc/fallbackDisplay';
import { Stop } from '../../types';
import { convertSecondsToHoursAndMinutes } from './utils.hsl';

const numberOfDepartures = 2;
const currentEpochTime = new Date().getTime() / 1000; // Divide by 1000 to convert milliseconds to seconds

export function HslTimeTable({ stationId }: HslProps) {
  const timetable = useTimetable(
    stationId,
    currentEpochTime,
    numberOfDepartures
  );

  const { data, fetching, error } = timetable;
  if (fetching || error) return <FallbackDisplay text={'N/A'} />;

  const { desc, stoptimesWithoutPatterns } =
    data?.stop || ({} as Stop);

  console.log('stoptimesWithoutPatterns', stoptimesWithoutPatterns);
  return (
    <Grid xs={6}>
      <Typography className="Info__title Info__title--center">
        {desc}
      </Typography>
      <Grid container>
        {stoptimesWithoutPatterns.map((stop, index) => {
          const {
            trip: { route },
            scheduledArrival,
            arrivalDelay,
          } = stop;
          const { hours, minutes } =
            convertSecondsToHoursAndMinutes(scheduledArrival);

          return (
            <>
              <Grid item xs={3}>
                <Typography className="Timetable__content Timetable--align-left">
                  {route.shortName}
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                alignItems={'center'}
                justifyContent={'end'}
                display={'flex'}
              >
                <Typography className="Timetable__delay">
                  {arrivalDelay === 0 ? '--' : `${arrivalDelay}s`}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className="Timetable__content Timetable--align-right">
                  {`${hours}:${minutes}`}
                </Typography>
              </Grid>
            </>
          );
        })}
      </Grid>
    </Grid>
  );
}

interface HslProps {
  stationId: string;
}
