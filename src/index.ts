require("dotenv").config();
import { env } from "process";
import { ShardingManager } from "discord.js";

// Create a new shard manager
const manager = new ShardingManager(__dirname + "/bot.js", {
  token: env.TOKEN,
  totalShards: "auto",
});

// Handler for a shard create event
manager.on("shardCreate", (shard) => {
  console.log(`Launched shard ${shard.id+1}/${manager.totalShards}`);
});

// Spawn the shards with 10 second retry time
manager.spawn(manager.totalShards, 10000);
