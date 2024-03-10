import { generateOtp } from "../../../../utils/generateOtp";
import { sendPayloadType } from "../../../../utils/types/otpSender";
import { getPaylaod } from "../../../../utils/verifyEmail";
import { transporter } from "../../../mailer/config";
import { sendOtpProducer } from "../producers/sendOtpproducer";

export class NotificaionConsumerActions {
  async sendOtpforUser(verificationLink: string) {
    try {
      console.log(` ()        Send Otp consumer called 🛺        ()`);

      // const sixDigitOtp = generateOtp();
      const splited = verificationLink.split("/");
      const userData = getPaylaod(splited[splited.length - 2]);
      
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

          const sendingData: { link: string; email: string } = {
            link: verificationLink,
            email: userData.email,
          };
          await sendOtpProducer(sendingData);
          console.log(` Email sended ${info}`);
        }
      });
    } catch (error) {
      console.log(
        "🚀 ~ NotificaionConsumerActions ~ sendOtpforUser ~ error:",
        error
      );
    }
  }
  async sendRejectmailforCompany(data: { email: string; description: string }) {
    try {
      const mailOptions = {
        from: String(process.env.ASCENT_OFFICIAL_MAIL),
        to: String(data.email),
        subject: "Alert from Ascent ",
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">ASCENT</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p> Your confirmation request has been rejected ascent admin  </p>
          <h3>because ${data.description} </h3>
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
          console.log(` Error while sending reject mail`);
          throw err;
        }
        console.log(`Email sended Succesfully ${JSON.stringify(info)}`);
      });
    } catch (error) {
      console.log(
        "🚀 ~ NotificaionConsumerActions ~ sendRejectmailforCompany ~ error:",
        error
      );
    }
  }
  async sendForgotPassMail(link: string) {
    try {
      const splited = link.split("/");
      const mail=getPaylaod(splited[splited.length - 2]).email;
      const mailOptions = {
        from: String(process.env.ASCENT_OFFICIAL_MAIL),
        to: String(mail),
        subject: "Alert from Ascent ",
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">ASCENT</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p> Forgot Password verification Link </p>
          <a href="${link}" style="width:200px;margin:auto;height:30px;background:blue;color:white;padding:5px;border-radius:5px">Verify Email</a>
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
          console.log(` Error while sending forgot mail`);
          throw err;
        }
        console.log(`Email sended Succesfully ${JSON.stringify(info)}`);
      });
    } catch (error) {
      console.log(
        "🚀 ~ NotificaionConsumerActions ~ sendForgotMail ~ error:",
        error
      );
    }
  }
}
