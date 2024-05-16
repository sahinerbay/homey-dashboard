import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { ForecastByHourItem } from '../../types';
import { FMI_IMAGE_URL } from '../../config';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  width: '160px',
  height: '160px',
  marginTop: '-20px',
});

export function ForecastByHour({
  data: forecastByHour,
}: ForecastByHourProps) {
  return (
    <>
      {forecastByHour.map((item, index: number) => {
        const { time, flike, symb, temp, pop, precipitation } = item;
        return (
          <Grid item xs={3} key={index} className="Weather__hour">
            <Typography className="Weather--bold Weather__hour__title">
              {time}
            </Typography>
            <Img src={`${FMI_IMAGE_URL}/${symb}.svg`} />
            <Typography className="Weather--bold Weather__hour__temp">
              {temp}°
              <Typography
                className="Weather--bold Weather__hour__divider"
                component="span"
              >
                |
              </Typography>
              <Typography
                className="Weather--bold Weather__hour__flike"
                component="span"
              >
                {flike}°
              </Typography>
            </Typography>
            <Typography className="Weather--bold Weather__hour__pop">
              {pop}% {precipitation}mm
            </Typography>
          </Grid>
        );
      })}
    </>
  );
}

interface ForecastByHourProps {
  data: ForecastByHourItem[];
}
