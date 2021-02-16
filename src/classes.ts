import { Client as DiscordClient, Collection, ClientOptions } from "discord.js";
import * as fs from "fs";

export class Client extends DiscordClient {
  public commands: Collection<string, any>;
  public aliases: Collection<string, any>;

  constructor(options ?: ClientOptions) {
    super(options);
    this.commands = new Collection();
    this.aliases = new Collection();
    this.LoadCommands();
  };

  LoadCommands() {
    fs.readdir(__dirname + "/commands", async (err, dirs) => {
      if (err) return console.error(err);

      if (dirs.length === 0) {
        return console.error("Command directory not found.");
      }

      dirs.forEach((dir) => {
        fs.readdir(`${__dirname}/commands/${dir}`, (err, files) => {
          if (err) return console.error(err);

          const jsfile = files.filter(f => f.split('.').pop() === "js");
          if (jsfile.length === 0) {
            return console.error(`No files in /commands/${dir}`);
          }

          jsfile.forEach((file) => {
            const props = require(`${__dirname}/commands/${dir}/${file}`);
            props.type = dir;
            this.commands.set(props.help.name, props);
            props.help.aliases.forEach((alias: string) => {
              this.aliases.set(alias, props.help.name);
            })
          })
        });
      });
    });
  }
}
