import { producer } from "..";
import { User } from "../../../../entities/UserEntity";

export const userAddProducer = async (userData: User) => {
  try {
    console.log(`🚀🚀 User Adding producer 🚀🚀`);
    await producer.connect();
    const messages = [
      {
        topic: String(process.env.USER_SERVICE_TOPIC),
        messages: [
          {
            key: String(process.env.ADD_USER_USER_SERVICE_KEY),
            value: JSON.stringify(userData),
          },
        ],
      },
    ];
    producer.sendBatch({ topicMessages: messages });
  } catch (error) {
    console.log(` _Erro in user AddProducer __`);
    throw error;
  } finally {
    producer.disconnect();
  }
};
