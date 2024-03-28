import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { HomeyRoomInfoInterface } from '../../../types';

export function InfoZone({ roomTempAndHumid }: InfoZoneProps) {
  const { temperature, humidity } = roomTempAndHumid;

  return (
    <Grid item container alignItems={'baseline'}>
      <Grid item xs={6}>
        <Typography className="Homey__device__room_info Homey__device__room_info--left">
          {humidity}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography className="Homey__device__room_info Homey__device__room_info--right">
          {temperature}
        </Typography>
      </Grid>
    </Grid>
  );
}

interface InfoZoneProps {
  roomTempAndHumid: HomeyRoomInfoInterface;
}
