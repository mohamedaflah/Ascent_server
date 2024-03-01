export const generateOtp = (): string => {
  const otp = Math.floor(Math.random() * 1_000_000)
    .toString()
    .padStart(6, "0");
  return otp;
};
