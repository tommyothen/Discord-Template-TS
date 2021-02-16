import { Client, Message } from "discord.js";

module.exports.run = async (client: Client, msg: Message, args: string[]) => {
  msg.channel.send("Pong!");
}

module.exports.help = {
  name: "ping",
  aliases: ["pong"],
  description: "Quickly ping the bot!",
}
