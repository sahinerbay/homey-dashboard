import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

const IconWindow = styled('img')({
  width: '45px',
  height: '42px',
  position: 'absolute',
  left: '0px',
  top: '4px',
});

const IconMotion = styled('img')({
  width: '40px',
  height: '40px',
  position: 'absolute',
  right: '2px',
  top: '4px',
});

const IconWet = styled('img')({
  width: '45px',
  height: '48px',
  position: 'absolute',
  left: '4px',
  top: '2px',
});

export function HeaderZone({
  zoneName,
  isActiveMotion,
  isWindowOpen,
  isWet,
}: Readonly<HeaderZoneProps>) {
  return (
    <Grid item xs>
      <Typography
        className="Homey__zone"
        marginBottom={zoneName === 'Hallway' ? '25px !important' : 0}
      >
        {isWindowOpen && <IconWindow src="/icon/window.png" />}
        {isWet && <IconWet src="/icon/wet.png" />}
        {zoneName.toUpperCase()}
        {isActiveMotion && <IconMotion src="/icon/motion.png" />}
      </Typography>
    </Grid>
  );
}

interface HeaderZoneProps {
  zoneName: string;
  isWet: boolean;
  isWindowOpen: boolean;
  isActiveMotion: boolean;
}
