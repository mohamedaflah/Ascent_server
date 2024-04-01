import { Kafka, Producer, Consumer } from "kafkajs";
const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKER_URL as string],
  clientId: process.env.KAFKA_CLIENT_ID as string,
});

export const consumer: Consumer = kafka.consumer({
  groupId: process.env.COMMUNICATION_SERVICE_KAFKA_GROUP_ID as string,
});
export const producer: Producer = kafka.producer();
