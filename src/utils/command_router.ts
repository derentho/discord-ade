import { Client, Message } from "discord.js";
import Command from "./command";
import Context from "./context";

/**
 * Gère le routage des commandes ainsi que l'affichage de l'aide (`help`).
 */
export default class CommandRouter {

    // --- Attribut ---

  #commands: Map<string, Command>;


    // --- Constructeur ---

  constructor(client: Client) {
    this.#commands = new Map<string, Command>();
    client.on("message", (message: Message) => {

      if (!message.content.startsWith(this.context.config.prefix)) {
        return;
      }

      const command = message.content.split(" ")[0]
        .substring(this.context.config.prefix.length);
      const args = message.content.split(" ").slice(1);

      if (this.#commands.has(command)) {
        void this.#commands.get(command)?.execute(message, args);
      } else {
        void message.channel.send("La commande n'est pas reconnue");
      }
    });
  }


    // --- Accesseur ---

  /**
   * Le contexte de l'application.
   */
  get context(): Context {
    return Context.getInstance();
  }


    // --- Méthode ---

  /**
   * Ajoute des commandes au routeur.
   * 
   * @param commands Un ensemble de commandes.
   */
  register(...commands: Command[]): void {
    for (const command of commands) {
      this.#commands.set(command.command, command);
    }
  }

}
