import { Client } from "./classes";
import { env } from "process";
require("dotenv").config();

// Create a new client instance
const client = new Client();

// Handler for client ready event
client.on("ready", () => {
  if (client.shard?.ids.includes(0))
    console.log(`Logged in as ${client.user?.tag}!`);
});

// Handler for message event
client.on("message", async (msg) => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;

  // Set the prefix
  const prefix = "!";

  // Format message and args
  const messageArray = msg.content.split(" ");
  const cmd = messageArray[0];
  const strippedCmd = cmd.replace(prefix, "")
  const args = messageArray.splice(1);

  // Grab command if exists
  const commandFile = client.commands.get(strippedCmd) ||
    client.commands.get(client.aliases.get(strippedCmd));

  if (commandFile && cmd.startsWith(prefix)) {
    commandFile.run({client, msg, args});
  }
});

// Handler for error event
client.on("error", console.error);

// Log in to the bot
client.login(env.TOKEN);
