export function convertSecondsToHoursAndMinutes(
  scheduledArrivalTime: number
) {
  const hours = Math.floor(scheduledArrivalTime / 3600) % 24; // Ensure hours are within 0-23
  const minutes = Math.floor((scheduledArrivalTime % 3600) / 60);

  // Use padStart to add leading zeros to minutes
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedHours = hours.toString().padStart(2, '0');

  return { hours: formattedHours, minutes: formattedMinutes };
}
