import { consumer } from "..";

export const runConsumer = async () => {
  try {
    await consumer.connect();

    await consumer.subscribe({
      topic: process.env.COMMUNICATION_SERVICE_TOPIC as string,
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ message }) => {
        console.log(`consumer __`);
        console.log(`Messages ${JSON.stringify(message)}`);

        const{key,value}=message
      },
    });
  } catch (error) {
    console.log("🚀 ~ runConsumer ~ error:", error);
  }
};
