import { Kafka, Producer, Consumer } from "kafkajs";

const kafka = new Kafka({
  clientId: String(process.env.KAFKA_CLIENT_ID),
  brokers: [String(process.env.KAFKA_BROKER_URL)],
});

export const consumer = kafka.consumer({
  groupId: String(process.env.USER_SERVICE_KAFKA_GROUP_ID),
});
export const producer=kafka.producer()