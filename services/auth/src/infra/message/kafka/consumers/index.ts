import { consumer } from "..";
import { subscriber } from "../subscriber";

export const runConsumer = async () => {
  try {
    await consumer.connect(); // -> Connecting consumer

    await consumer.subscribe({
      topic: String(process.env.AUTH_SERVICE_TOPIC),
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ message }) => {
        console.log(" Calling Consumer *(*(*(  ");
        
        console.log(message);
        const { key, value } = message;
        const subscriberKey: string = String(key?.toString("utf8"));
        const action = subscriber()[subscriberKey];
        console.log("🚀 ~ eachMessage: ~ value:", JSON.parse(value?.toString("utf8")??""))
        if (action) {
          await action(JSON.parse(value?.toString("utf8") ?? ""));
        } else {
          console.log("No actions found");
        }
      },
    });
  } catch (error) {
    console.log(` Err in consumer running ${error} `);

    throw error;
  }
};

export const stopConsumer = async () => {
  await consumer.stop();
  await consumer.disconnect();
};
