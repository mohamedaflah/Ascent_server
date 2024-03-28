import { parse, format } from "date-fns";

export function convertTimeToAMPM(time: string) {
  // Assuming today's date for the time string for simplicity
  const currentDate = new Date();
  const [hours, minutes] = time.split(":").map(Number);

  // Create a new Date object with the current date and time specified by the input
  const dateTime = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    hours,
    minutes
  );

  // Format the Date object to a string with AM/PM notation
  return format(dateTime, "h:mm aa");
}
