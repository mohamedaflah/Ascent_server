import { Kafka, Producer, Consumer } from "kafkajs";

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID as string,
  brokers: [process.env.KAFKA_BROKER_URL as string],
});

export const consumer = kafka.consumer({
  groupId: process.env.COMPANY_SERVICE_KAFKA_GROUP_ID as string,
});
export const producer = kafka.producer();
