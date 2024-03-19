import { producer } from "..";
import { Company } from "../../../../entities/company.entitie";

export const addCompany = async (data: Company) => {
    try {
        await producer.connect();
        console.log("🚀 ~ addCompany ~ data:", data)
      console.log(` Add company producer for job service`);
  
      const messages = [
        {
          topic: process.env.JOB_SERVICE_TOPIC as string,
          messages: [
            {
              key: process.env.ADD_COMPANY_SUBSCIBER_KEY as string,
              value: JSON.stringify(data),
            },
          ],
        },
      ];
      producer.sendBatch({ topicMessages: messages });
    } catch (error) {
      console.log("🚀 ~ addCompany ~ error:", error);
    } finally {
      producer.disconnect();
    }
  };
  