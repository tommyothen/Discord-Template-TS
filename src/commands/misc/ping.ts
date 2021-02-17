import { Client, Message } from "discord.js";

// This is the main function that the bot will run
module.exports.run = async (client: Client, msg: Message, args: string[]) => {
  msg.channel.send("Pong!");
}

// Give the bot some information about this command
module.exports.help = {
  name: "ping",
  aliases: ["pong"],
  description: "Quickly ping the bot!",
}
