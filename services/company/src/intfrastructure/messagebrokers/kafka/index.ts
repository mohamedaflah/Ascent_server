import { Kafka, Producer, Consumer } from "kafkajs";

const kafka = new Kafka({
  clientId: String(process.env.KAFKA_CLIENT_ID),
  brokers: [String(process.env.KAFKA_BROKER_URL)],
  // ssl: true, // this code removed for development 
  // sasl: {
  //   mechanism: 'plain',
  //   username: String(process.env.KAFKA_USER_NAME),
  //   password: String(process.env.KAFKA_PASSWORD),
  // },
});
console.log(process.env.KAFKA_CLIENT_ID,'((');
console.log(process.env.KAFKA_BROKER_URL,'))((');

export const consumer: Consumer = kafka.consumer({
  groupId: process.env.COMPANY_SERVICE_KAFKA_GROUP_ID as string,
});
export const producer: Producer = kafka.producer();
