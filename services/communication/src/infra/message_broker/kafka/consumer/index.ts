import { consumer } from "..";
import { subscriber } from "../subscriber/subscriber";

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
        const { key, value } = message;
        const subscriberKey: string = key?.toString("utf-8") as string;
        console.log("🚀 ~ eachMessage: ~ subscriberKey:", subscriberKey);
        const action = subscriber()[subscriberKey];
        if (action) {
          await action(JSON.parse(value?.toString("utf8") ?? "{}"));
        } else {
          console.log(` No actions found`);
        }
      },
    });
  } catch (error) {
    console.log("🚀 ~ runConsumer ~ error:", error);
  }
};

export const stopConsumer = async () => {
  await consumer.disconnect();
  await consumer.stop();
};
