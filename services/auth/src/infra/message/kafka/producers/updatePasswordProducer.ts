import { producer } from "..";

export const updatePassProducer = async (
  sendPayload: { id: string; newPass: string },
  role: "admin" | "user" | "company"
) => {
  try {
    await producer.connect();
    const messages = [
      {
        topic:
          role === "user" || role == "admin"
            ? (process.env.USER_SERVICE_TOPIC as string)
            : (process.env.COMPANY_SERVICE_TOPIC as string),
        messages: [
          {
            key: process.env.UPDATE_PASSWORD_KEY as string,
            value: JSON.stringify(sendPayload),
          },
        ],
      },
    ];
    producer.sendBatch({ topicMessages: messages });
  } catch (error) {
    console.log(` Found err in update password prouducer`);
  } finally {
    producer.disconnect();
  }
};
