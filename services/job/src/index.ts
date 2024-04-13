import "./presentation/app";
import "./infra/databases/mongodb/.config";
import './infra/external/cron-job'
import {
  runConsumer,
  stopConsumer,
} from "./infra/messagebroker/kafka/consumers";
(async () => {
  await runConsumer();
  process.on("SIGTERM", async () => {
    stopConsumer();
  });
})();
// job service