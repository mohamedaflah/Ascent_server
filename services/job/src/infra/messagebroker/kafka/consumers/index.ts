import { consumer } from "..";
import { subscriber } from "../subscriber/subscriber";

export const runConsumer = async () => {
  try {
    console.log("consumer running 🎈🎈",process.env.JOB_SERVICE_TOPIC);
    
    await consumer.connect();

    await consumer.subscribe({
      topic: process.env.JOB_SERVICE_TOPIC as string,
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ message }) => {
        console.log(` Calling Consumer`);
        console.log(` Msg: ${JSON.stringify(message)}`);

        const { key, value } = message;
        const subscriberKey: string = key?.toString("utf-8") as string;
        console.log("🚀 ~ eachMessage: ~ subscriberKey:", subscriberKey)
        const action = subscriber()[subscriberKey];
        if (action) {
          await action(JSON.parse(value?.toString("utf8") ?? "{}"));
        } else {
          console.log(` No actions found`);
        }
      },
    });
  } catch (error) {
    console.log("🚀 ~ runConsumer ~ error:", error)
  }
};

export const stopConsumer = async () => {
  await consumer.disconnect();
  await consumer.stop();
};
