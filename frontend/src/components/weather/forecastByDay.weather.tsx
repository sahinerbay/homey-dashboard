import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { ForecastByDayItem } from '../../types';
import { FMI_IMAGE_URL } from '../../config';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  width: '100px',
  height: '100px',
  marginTop: '-16px',
});

export function ForecastByDay({
  data: forecastByDay,
}: ForecastByDayProps) {
  return (
    <>
      {forecastByDay.map((item, index) => {
        const {day, lowest, highest} = item;
        return (
          <Grid item xs={3} key={index} className='Weather__day'>
            <Typography className="Weather--bold Weather__day__title">
              {day}
            </Typography>
            <Grid container item xs key={index}>
              {[lowest, highest].map((item, index) => {
                const  [temp, time, symb] = item;
                return (
                  <Grid item xs={6} key={index}>
                     <Typography
                        className="Weather--bold Weather__day__time"
                        component="span"
                      >
                        {time}
                      </Typography>
                    <Img src={`${FMI_IMAGE_URL}/${symb}.svg`} />
                    <Typography className="Weather--bold Weather__day__temp">
                      {temp}°
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        );
      })}
    </>
  );
}

interface ForecastByDayProps {
  data: ForecastByDayItem[];
}
