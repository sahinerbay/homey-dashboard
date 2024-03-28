import winston, { format } from 'winston';

export const getTimeDifferenceInMinutes = (
  dateIso: string
): string => {
  const currentDate = new Date().getTime();
  const pastDate = new Date(dateIso).getTime();

  const timeDifference = currentDate - pastDate;

  // Convert the time difference to seconds
  const secondsDifference = Math.floor(timeDifference / 1000);

  // Calculate the elapsed time in days, hours, minutes, and seconds
  const days = Math.floor(secondsDifference / (24 * 60 * 60));
  const hours = Math.floor(
    (secondsDifference % (24 * 60 * 60)) / (60 * 60)
  );
  const minutes = Math.floor((secondsDifference % (60 * 60)) / 60);
  const seconds = secondsDifference % 60;

  let diff = '';
  if (days > 0) diff += `${days}d `;
  if (hours > 0) diff += `${hours}h `;
  if (minutes > 0) diff += `${minutes}m `;
  if (seconds > 0) diff += `${seconds}s`;
  return diff;
};

export const formatDayLength = (dayLength: string) => {
  // Use a regular expression to extract hours and minutes
  const match = dayLength.match(/(\d+)\s*h\s*(\d+)\s*min/);

  if (match) {
    const hours = match[1];
    const minutes = match[2];

    // Create the desired format
    const outputString = `${hours}h ${minutes}m`;
    return outputString;
  } else {
    return dayLength;
  }
};

export const formatUpdatedAt = (updatedAt: string): string => {
  if (updatedAt.includes('h')) {
    const [hours, mins] = updatedAt.split(' ');
    return `${hours} ${mins}`;
  }
  return updatedAt;
};

//  https://en.ilmatieteenlaitos.fi/ returns timestamps in local time
export const setUTCForecastTimestamp = (forecastDate: string) => {
  const date = new Date(forecastDate);

  if (process.env.NODE_ENV !== 'local') {
    const { sign, offsetHour } = getTimezoneOfHost();

    if (sign === '+') {
      date.setHours(date.getHours() - offsetHour);
    } else {
      date.setHours(date.getHours() + offsetHour);
    }
  }

  return date.toISOString();
};

//  https://en.ilmatieteenlaitos.fi/ returns forecast on Helsinki time
//  and UTC of Raspberry Pi (as a host) is set to UTC 0
//  Therefore we need to minus timezone of Helsinki from the forecast time
export const getTimezoneOfHost = () => {
  const timeZone = 'Europe/Helsinki';
  const currentDateTime = new Date();

  // Get the time zone offset for Helsinki in minutes
  const timeZoneInfo = currentDateTime.toLocaleString('en-US', {
    timeZone: timeZone,
    timeZoneName: 'short',
  });
  const [, partAfterGMT] = timeZoneInfo
    .split('GMT')
    .map((str) => str.trim());

  const sign = partAfterGMT[0];
  const offsetHour = partAfterGMT.slice(1);

  return {
    sign,
    offsetHour: +offsetHour,
  };
};

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [new winston.transports.Console()],
});
