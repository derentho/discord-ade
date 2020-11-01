import { Message } from "discord.js";
import Context from "./context";

/**
 * Une commande personnalisée. Permet de mettre en page l'aide et fournit des
 *  aides tels que le parsing des arguments.
 */
export default abstract class Command {

    // --- Attributs ---

  readonly command: string;
  readonly description: string;
  readonly help: string;


    // --- Constructeur ---

  constructor(command: string, description: string, help: string) {
    this.command = command;
    this.description = description;
    this.help = help;
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
   * Effectue la commande.
   * 
   * @param message Le message source de la commande.
   * @param args Les arguments, parsées par avance, de la commande.
   */
  async abstract execute(message: Message, args?: string[]): Promise<void>;

}
