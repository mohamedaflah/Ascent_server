export function generateOTP() {
  // Generate a random number between 0 and 9999
  const otp = Math.floor(Math.random() * 10000);

  // Convert the number to a string and ensure it is always 4 digits
  return otp.toString().padStart(4, "0");
}
