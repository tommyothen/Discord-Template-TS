import { Message } from "discord.js";

// This is the main function that the bot will run
module.exports.run = async ({ msg }: { msg: Message }) => {
  msg.channel.send("Pong!");
}

// Give the bot some information about this command
module.exports.help = {
  name: "ping",
  aliases: ["pong"],
  description: "Quickly ping the bot!",
}
