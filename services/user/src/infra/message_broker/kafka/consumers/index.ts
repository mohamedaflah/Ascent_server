import { consumer } from "..";

export const runConsumer = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({
      topic: String(process.env.USER_SERVICE_TOPIC),
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ message }) => {
        console.log(` User service consumer `);
        const { key, value } = message;
      },
    });
  } catch (error) {
    console.log(`Error while running consumer ${error}`);
  }
};

export const stopConsumer = async () => {
  await consumer.disconnect();
  await consumer.stop();
};
