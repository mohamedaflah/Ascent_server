import { consumer } from "..";
import { subscriber } from "../subscriber";

export const runConsumer = async () => {
  try {
    await consumer.connect();

    await consumer.subscribe({
      topic: process.env.COMPANY_SERVICE_TOPIC as string,
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ message }) => {
        console.log(` Compnay consumer calling ${message}`);
        const { key, value } = message;
        const subscriberKey: string = String(key?.toString("utf8"));
        const action = subscriber()[subscriberKey];
        if (action) {
          await action(JSON.parse(value?.toString("utf8") ?? "{}"));
        } else {
          console.log(` NO action found `);
        }
      },
    });
  } catch (error) {
    console.log(`  Err in Company service consumer `);
    throw error;
  }
};

export const stopConsumer = async () => {
  await consumer.stop();
  await consumer.disconnect();
};
