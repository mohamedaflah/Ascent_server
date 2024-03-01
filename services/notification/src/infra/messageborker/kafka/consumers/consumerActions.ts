import { generateOtp } from "../../../../utils/generateOtp";
import { sendPayloadType } from "../../../../utils/types/otpSender";
import { getPaylaod } from "../../../../utils/verifyEmail";
import { transporter } from "../../../mailer/config";
// import { sendOtpProducer } from "../producers/sendOtpproducer";
// // {
// //   firstname: string;
// //   lastname: string;
// //   email: string;
// //   password: string;
// //   role: "user" | "admin" | "company";
// // }
export class NotificaionConsumerActions {
  async sendOtpforUser(verificationLink:string ) {
    console.log(` ()        Send Otp consumer called 🛺        ()`);

    const sixDigitOtp = generateOtp();
    const splited=verificationLink.split('/')
    const userData=getPaylaod(splited[splited.length-1])
    const mailOptions = {
      from: String(process.env.ASCENT_OFFICIAL_MAIL),
      to: String(userData.email),
      subject: "Ascent Confirmation Reginstration",
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">ASCENT</a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
        <a href="${verificationLink}" style="width:200px;margin:auto;height:30px;background:blue;color:white;padding:5px;border-radius:5px">Verify Email</a>
        <p style="font-size:0.9em;">Regards,<br />ASCENT</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p>ASCENT Inc</p>
          <p>1600 Amphitheatre Parkway</p>
          <p>India</p>
        </div>
      </div>
    </div>`,
    };
    transporter.sendMail(mailOptions, async (err: any, info) => {
      if (err) {
        console.log(` Error sending mail ${err}`);
      } else {
        // console.log(userData,'  *******')


        // const sendingData: sendPayloadType = {
        //   email: userData.email,
        //   otp: sixDigitOtp,
        //   userData: userData,
        // };
        console.log(` Email sended ${info}`);
      }
    });
  }
}
