import { producer } from "..";

export const sendForgotMailLink = async (link: string) => {
  try {
    await producer.connect();
    const messages = [
      {
        topic: process.env.NOTIFIICATION_SERVICE_TOPIC as string,
        messages: [
          {
            key: String(process.env.NOTIFICATION_SERVICE_SEND_FORGOT_MAIL_KEY),
            value: JSON.stringify(link),
          },
        ],
      },
    ];

    producer.sendBatch({ topicMessages: messages });
  } catch (error) {
    console.log(` Err in forGotMailLInk producer _`);
  } finally {
    producer.disconnect();
  }
};
