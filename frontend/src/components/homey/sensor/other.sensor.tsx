import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const Icon = styled('img')({
  height: '40px',
});

export function SensorOther({
  isMotion,
  isOpen,
  isWet,
  isTempRising
}: Readonly<SensorOtherProps>) {

    return (
      <>
        <Grid xs={1} container justifyContent={'center'}>
          <Typography className="homey__device homey-center">
          {isMotion && <Icon src="/icon/motion.png" />}
          </Typography>
        </Grid>
        <Grid xs={1} container justifyContent={'center'}>
          <Typography className="homey__device homey-center">
          {isOpen && <Icon src="/icon/window.png" />}
          </Typography>
        </Grid>
        {/* Although No icon shows in the UI when the sensor is inactive, it still 
        takes space from the Grid. In order to fit all, we need to hide one of the icons. 
        After all, No zones have all three sensor types. */}
        {isWet && <Grid xs={1} justifyContent={'center'}>
          <Typography className="homey__device homey-center">
            <Icon src="/icon/wet.png" />
          </Typography>
        </Grid>}
      </>
    );
}

interface SensorOtherProps {
  isMotion: boolean | undefined;
  isOpen: boolean | undefined;
  isWet: boolean | undefined;
  isTempRising: boolean;
}
