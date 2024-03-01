import { producer } from "..";
import { sendPayloadType } from "../../../../utils/types/otpSender";

export const sendOtpProducer = async (otpData: sendPayloadType) => {
  try {
    // AUTH_SERVICE_TOPIC=auth-service-topic
    await producer.connect();
    console.log(` Send otp succesfull producer called__ ${JSON.stringify(otpData)}`);

    const messages = [
      {
        topic: String(process.env.AUTH_SERVICE_TOPIC),
        messages: [
          {
            key: "signup_user",
            value: JSON.stringify(otpData),
          },
        ],
      },
    ];

    producer.sendBatch({ topicMessages: messages });
  } catch (error) {
    console.log(` Error in send Otp product ${error}`);
  } finally {
    producer.disconnect();
  }
};
