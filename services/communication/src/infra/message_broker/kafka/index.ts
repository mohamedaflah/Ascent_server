import { readFileSync } from "fs";
import { Kafka, Producer, Consumer, logLevel } from "kafkajs";
import path from "path";

const sslOptions = {
  rejectUnauthorized: true,
  ca: [readFileSync(path.resolve(__dirname, "ca.pem"), "utf-8")],
  // key: readFileSync(path.resolve(__dirname, "service.key"), "utf-8"),
  // cert: readFileSync(path.resolve(__dirname, "service.cert"), "utf-8"),
};
const kafka = new Kafka({
  clientId: String(process.env.KAFKA_CLIENT_ID),
  brokers: [String(process.env.KAFKA_BROKER_URL)],
  ssl: sslOptions, // removed this much code for development
  sasl: {
    mechanism: "scram-sha-256",
    username: String(process.env.KAFKA_USER_NAME),
    password: String(process.env.KAFKA_PASSWORD),
  },
});

export const producer: Producer = kafka.producer();
export const consumer: Consumer = kafka.consumer({
  groupId: String(process.env.COMMUNICATION_SERVICE_KAFKA_GROUP_ID),
});
