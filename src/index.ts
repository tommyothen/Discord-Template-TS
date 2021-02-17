import { Client } from "./classes";
import { env } from "process";
require("dotenv").config();

// Create a new client instance
const client = new Client();

// Handler for client ready event
client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

// Handler for message event
client.on("message", async (msg) => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;
});

// Handler for error event
client.on("error", console.error);

// Log in to the bot
client.login(env.TOKEN);
