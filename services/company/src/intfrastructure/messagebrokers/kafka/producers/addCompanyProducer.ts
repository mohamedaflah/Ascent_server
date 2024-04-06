import { producer } from "..";
import { Company } from "../../../../entities/company.entitie";

export const addCompanyProducer = async (data: Company) => {
  try {
    await producer.connect();
    console.log("🚀 ~ addCompany ~ data:", data);
    console.log(` Add company producer for job service And Communication`);
    console.log(` JOb topic ${process.env.JOB_SERVICE_TOPIC}`);
    console.log(
      ` Communication topic ${process.env.COMMUNICATION_SERVICE_TOPIC}`
    );
    console.log(` Job subscirber ${process.env.COMMUNICATION_SERVICE_TOPIC}`);
    console.log(` Job topic ${process.env.ADD_COMPANY_SUBSCIBER_KEY}`);
    console.log(
      ` Communication topic ${process.env.ADD_COMPANY_SUBSCIBER_KEY}`
    );

    const messages = [
      {
        // JOB_SERVICE_TOPIC=job-service-topic
        topic: process.env.JOB_SERVICE_TOPIC as string,
        messages: [
          {
            key: process.env.ADD_COMPANY_SUBSCIBER_KEY as string,
            value: JSON.stringify(data),
          },
        ],
      },
      {
        topic: process.env.COMMUNICATION_SERVICE_TOPIC as string,
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
