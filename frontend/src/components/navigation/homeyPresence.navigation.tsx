import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { FallbackDisplay } from '../misc/fallbackDisplay';
import { HomeyUserPresence } from '../../types';

export function HomeyPresence({
  userPresence,
}: Readonly<HomeyPresenceProps>) {
  if (!userPresence) return <FallbackDisplay text={'N/A'} />;

  return (
    <Grid container className="home-presence">
      {userPresence.map((user) => {
        return (
          <Grid item xs={4}>
            <Typography className="Info">
              {user.name}: {user.isHome ? 'Home' : 'Away'}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
}

interface HomeyPresenceProps {
  userPresence: HomeyUserPresence[] | null;
}
