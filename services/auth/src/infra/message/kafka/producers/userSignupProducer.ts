import { producer } from "..";
import { User } from "../../../../entities/UserEntity";

export const signupProducer = async (data: string) => {
  try {
    console.log(` __ User signup producer __ `);
    // console.log("🚀 ~ signupProducer ~ data:", data)
    await producer.connect();
    const messages = [
      {
        topic: String(process.env.NOTIFIICATION_SERVICE_TOPIC),
        messages: [
          {
            key: String(process.env.SEND_OTP_KEY),
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
