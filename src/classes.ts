import { Client as DiscordClient, Collection, ClientOptions } from "discord.js";
import * as fs from "fs";

// Extended client to support commands and command aliases
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
    // Open the commands directory
    fs.readdir(__dirname + "/commands", async (err, dirs) => {
      if (err) return console.error(err);

      // Check if there are any readable directories
      if (dirs.length === 0) {
        return console.error("Command directory not found.");
      }

      // Loop over each directory
      dirs.forEach((dir) => {
        // Open the subdirectory
        fs.readdir(`${__dirname}/commands/${dir}`, (err, files) => {
          if (err) return console.error(err);

          // Check if there are any javascript files
          const jsfile = files.filter(f => f.split('.').pop() === "js");
          if (jsfile.length === 0) {
            return console.error(`No files in /commands/${dir}`);
          }

          // Loop over each javascript file
          jsfile.forEach((file) => {
            // Import the file
            const props = require(`${__dirname}/commands/${dir}/${file}`);

            // Set the typing for the file, e.g. user, information, misc
            props.type = dir;

            // Set the command and aliases for the command
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
