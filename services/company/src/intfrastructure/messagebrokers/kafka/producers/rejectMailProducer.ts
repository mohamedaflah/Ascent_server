import { producer } from "..";

export const rejectMailProducer = async (
  email: string,
  description: string
) => {
  try {
    console.log(` Reject mail producer called `);
    await producer.connect();

    const messages = [
      {
        topic: process.env.NOTIFIICATION_SERVICE_TOPIC as string,
        messages: [
          {
            key: process.env.REJECT_MAIL_PRODUCER_KEY as string,
            value: JSON.stringify({ email, description }),
          },
        ],
      },
    ];
    producer.sendBatch({ topicMessages: messages });
  } catch (error) {
    console.log(` Error in company reject producer `);
  } finally {
    producer.disconnect();
  }
};

