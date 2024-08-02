import axios from "axios";

type SendOtpFunction = (email: string, otp: string) => Promise<boolean>;

export async function sendOtpWithRetries(
  sendOtp: SendOtpFunction,
  email: string,
  otp: string,
  maxRetries: number = 3
): Promise<boolean> {
  let attempt = 0;

  while (attempt < maxRetries) {
    attempt++;
    try {
      const success = await sendOtp(email, otp);
      if (success) {
        console.log(`OTP sent successfully on attempt ${attempt}`);
        return true;
      } else {
        console.log(`OTP sending failed on attempt ${attempt}`);
      }
    } catch (error) {
      console.error(`Error sending OTP on attempt ${attempt}:`, error);
    }
  }

  console.log("Failed to send OTP after maximum retries");
  return false;
}

export const sendOtp: SendOtpFunction = async (email, otp) => {
  try {
    const response = await axios.post(
      "https://ascent-notification-3m4p.onrender.com/api/auth-service/send-otp",
      // "http://localhost:3003/api/auth-service/send-otp",
      {
        data: {
          tag: `<h1 style="color:blue;font-weight:800">${otp}</h1>`,
          email: email,
        },
      }
    );

    return response.data.status;
  } catch (error) {
    console.error("Error in sendOtp function:", error);
    return false;
  }
};
