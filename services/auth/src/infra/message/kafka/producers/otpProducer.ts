//
import { producer } from "..";

export const otpProducer = async (data: { tag: string; email: string }) => {
  try {

    console.log("🚀 ~ otpProducer ~ data:", data)
    
    await producer.connect();
    const messages = [
      {
        topic: String(process.env.NOTIFIICATION_SERVICE_TOPIC),
        messages: [
          {
            key: String("sendVerificationOtp"),
            value: JSON.stringify(data),
          },
        ],
      },
    ];

    producer.sendBatch({ topicMessages: messages });
  } catch (error) {
    console.log(` _Error in auth Signup producer_ `);

    throw error;
  } finally {
    producer.disconnect();
  }
};
