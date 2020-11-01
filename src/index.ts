import { Client, Message } from "discord.js";
import Alias from "./commands/alias";
import Edt from "./commands/edt";
import Context from "./utils/context";

const client = new Client();
const context = Context.getInstance();

client.once("ready", () => {
  console.log("Client launched successfully");
});

client.on("message", (message: Message) => {
  if (!message.content.startsWith(context.config.prefix)) {
    return;
  }

  const command = message.content.split(" ")[0].substring(2);
  const args = message.content.split(" ").slice(1);
  switch (command) {

    case "alias":
      new Alias().execute(message, args);
      break;

    case "edt":
      new Edt().execute(message, args);
      break;

    default:
      void message.channel.send("La commande n'est pas reconnue");
  }
});

void client.login(context.config.token);
