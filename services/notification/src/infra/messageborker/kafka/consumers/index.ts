import { consumer } from "..";
import { subscriber } from "../subscriber";

export const runConsumer = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({
      topic: String(process.env.NOTIFIICATION_SERVICE_TOPIC),
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ message }) => {
        console.log(` _Notification service consumer_${message} `);
        const { key, value } = message;
        console.log(key?.toString("utf-8"), " Key");
        console.log(JSON.parse(value?.toString("utf-8") ?? ""), " Value");
        const subscriberKey: string = String(key?.toString("utf8"));
        const action = subscriber()[subscriberKey];
        if (action) {
          await action(JSON.parse(value?.toString("utf-8") ?? "{}"));
        } else {
          console.log(` No action found`);
        }
      },
    });
  } catch (error) {
    console.log(` Consumer run Err ${error}`);
    throw error;
  }
  console.log(
    "🚀 ~ runConsumer ~ process.env.NOTIFIICATION_SERVICE_TOPIC:",
    process.env.NOTIFIICATION_SERVICE_TOPIC
  );
};

export const stopConsumer = async () => {
  await consumer.disconnect();
  await consumer.stop();
};
