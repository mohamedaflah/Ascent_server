import { producer } from "..";

export const sendInterviewMail = async (data: {
  description: string;
  date: string;
  email: string;
}) => {
  try {
    console.log("interview scheduling sending producer");
    await producer.connect();

    const messages = [
      {
        topic: String(process.env.NOTIFIICATION_SERVICE_TOPIC),
        messages: [
          {
            key: String(process.env.SEND_INTERVIEW_MAIL),
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
