import "./presentation/app";
import "./infra/database/mongodb/config";
import {
  runConsumer,
  stopConsumer,
} from "./infra/message_broker/kafka/consumer";
import './infra/socket/index'
(async () => {
  await runConsumer();
  process.on("SIGTERM", async () => {
    stopConsumer();
  });
})();

// communication service