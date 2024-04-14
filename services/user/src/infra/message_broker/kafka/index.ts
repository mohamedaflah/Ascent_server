import { Kafka, Producer, Consumer } from "kafkajs";

const kafka = new Kafka({
  clientId: String(process.env.KAFKA_CLIENT_ID),
  brokers: [String(process.env.KAFKA_BROKER_URL)],
  ssl: true,
  sasl: {
    mechanism: 'plain',
    username: String(process.env.KAFKA_USER_NAME),
    password: String(process.env.KAFKA_PASSWORD),
  },
});
export const consumer = kafka.consumer({
  groupId: String(process.env.USER_SERVICE_KAFKA_GROUP_ID),
});
export const producer=kafka.producer()