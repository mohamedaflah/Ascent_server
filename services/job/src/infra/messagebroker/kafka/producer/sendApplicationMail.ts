import { producer } from "..";

export const sendApplicationMail = async (data: {
  description: string;
  status: string;
  title: string;
  email: string;
}) => {
  try {
    console.log("applicaiton sending producer");
    await producer.connect();

    const messages = [
      {
        topic: String(process.env.NOTIFIICATION_SERVICE_TOPIC),
        messages: [
          {
            key: String(process.env.SEND_APPLICAITON_MAIL),
            value: JSON.stringify(data),
          },
        ],
      },
    ];
    producer.sendBatch({ topicMessages: messages });
  } catch (error) {
    console.log("🚀 ~ sendApplicationMail ~ error:", error);
  } finally {
    producer.disconnect();
  }
};
