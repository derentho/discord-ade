import { Client } from "discord.js";
import Alias from "./commands/alias";
import Edt from "./commands/edt";
import CommandRouter from "./utils/command_router";
import Context from "./utils/context";

const client = new Client();
client.once("ready", () => {
  console.log("Client launched successfully");
});

const router = new CommandRouter(client);
router.register(
  new Alias,
  new Edt
);

const context = Context.getInstance();
void client.login(context.config.token);
