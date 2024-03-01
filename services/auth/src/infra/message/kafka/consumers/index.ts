import { consumer } from "..";

export const runConsumer = async () => {
  try {
    consumer.connect(); // -> Connecting consumer

    await consumer.subscribe({
      topic: String(process.env.AUTH_SERVICE_TOPIC),
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ message }) => {
        console.log(message);
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
