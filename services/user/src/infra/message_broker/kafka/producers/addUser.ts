import { producer } from "..";
import { User } from "../../../../entities/user.entity";

export const addUserProducer = async (user: User) => {
  try {
    await producer.connect();
    const messages = [
      {
        topic: process.env.JOB_SERVICE_TOPIC as string,
        messages: [
          {
            key: process.env.ADD_USER_JOB_SERVICE_KEY as string,
            value: JSON.stringify(user),
          },
        ],
      },
      {
        topic: process.env.COMMUNICATION_SERVICE_TOPIC as string,
        messages: [
          {
            key: process.env.ADD_USER_JOB_SERVICE_KEY as string,
            value: JSON.stringify(user),
          },
        ],
      },
    ];
    producer.sendBatch({ topicMessages: messages });
  } catch (error) {
    console.log(` Producer Err in addUser ${error}`);
  } finally {
    producer.disconnect();
  }
};
