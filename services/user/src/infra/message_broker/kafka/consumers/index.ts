import { consumer } from "..";
import { subscriber } from "../subscriber";

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
        console.log(key?.toString('utf8'), ' <--- Key');
        console.log(JSON.parse(value?.toString("utf-8") ?? ""), " <-- Value");
        const subscriberKey:string=String(key?.toString('utf8'))
        const action=subscriber()[subscriberKey]
        if(action){
          await action(JSON.parse(value?.toString('utf8')??"{}"))
        }else{
          console.log(` No action found `);
        }
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
