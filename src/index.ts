import { Client } from "./classes";
import { env } from "process";
require("dotenv").config();

const client = new Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("message", async (msg) => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;
});

client.on("error", console.error);

client.login(env.TOKEN);
