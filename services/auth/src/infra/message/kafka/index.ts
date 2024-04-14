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

export const producer: Producer = kafka.producer();
export const consumer: Consumer = kafka.consumer({
  groupId: String(process.env.AUTH_SERVICE_KAFKA_GROUP_ID),
});
