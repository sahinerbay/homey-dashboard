import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { FallbackDisplay } from '../misc/fallbackDisplay';
import { HomeyModeInfo } from '../../types';

export function HomeyMode({ modes }: Readonly<HomeyModeProps>) {
  if (!modes) return <FallbackDisplay text={'N/A'} />;

  const { Day, Presence, Season, Manual } = modes;

  return (
    <Grid container>
      {Manual ? (
        <Grid xs={12}>
          <Typography className="homey-modes">
            MANUAL MODE ENABLED
          </Typography>
        </Grid>
      ) : (
        <>
          <Grid item xs={4}>
            <Typography className="homey-modes homey-left">
              Mode: {Day}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className="homey-modes ">
              Presence: {Presence}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className="homey-modes homey-right">
              Season: {Season}
            </Typography>
          </Grid>
        </>
      )}
    </Grid>
  );
}

interface HomeyModeProps {
  modes: HomeyModeInfo | null;
}
