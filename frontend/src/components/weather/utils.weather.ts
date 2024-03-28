const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

// Function to add ordinal suffix to the day (e.g., 1st, 2nd, 3rd, 4th, etc.)
function addOrdinalSuffix(day: number) {
  if (day >= 11 && day <= 13) {
    return day + 'th';
  }
  switch (day % 10) {
    case 1:
      return day + 'st';
    case 2:
      return day + 'nd';
    case 3:
      return day + 'rd';
    default:
      return day + 'th';
  }
}

export const currentDay = (currentDate: Date) => {
  const dayOfWeekAbbrev = daysOfWeek[currentDate.getDay()];
  return dayOfWeekAbbrev;
};
