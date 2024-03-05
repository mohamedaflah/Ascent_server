import { producer } from "..";
import { User } from "../../../../entities/UserEntity";

export const companyAddProducer = async (companyData: User) => {
  try {
    console.log(` Company adding producer called`);
    await producer.connect();
    const messages = [
      {
        topic: process.env.COMPANY_SERVICE_TOPIC as string,
        messages: [
          {
            key: process.env.COMPANY_SERVICE_ADDCOMPANY_KEY as string,
            value: JSON.stringify(companyData),
          },
        ],
      },
    ];
    producer.sendBatch({ topicMessages: messages });
  } catch (error) {
    console.log(` Company Producer err ${error}`);
  } finally {
    producer.disconnect();
  }
};
