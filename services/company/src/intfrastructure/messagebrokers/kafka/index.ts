import { Kafka, Producer, Consumer } from "kafkajs";

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID as string,
  brokers: [process.env.KAFKA_BROKER_URL as string],
});
console.log(process.env.KAFKA_CLIENT_ID,'((');
console.log(process.env.KAFKA_BROKER_URL,'))((');

export const consumer: Consumer = kafka.consumer({
  groupId: process.env.COMPANY_SERVICE_KAFKA_GROUP_ID as string,
});
export const producer: Producer = kafka.producer();
