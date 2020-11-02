import { Message, MessageEmbed } from "discord.js";
import Command from "../utils/command";

/**
 * Associe un alias à un `rid` d'emploi du temps.
 */
export default class Alias extends Command {

    // --- Constructeur ---

  constructor() {
    super(
      "alias",
      "Associe un alias à un `rid`",
      "__A faire__"
    );
  }


    // --- Méthode ---

  // eslint-disable-next-line
  async execute(message: Message, args?: string[]): Promise<void> {
    if (args?.length != 2) {
      return;
    }
    this.context.setAlias(args[0], args[1]);
    const embed = new MessageEmbed()
      .setTitle("Alias")
      .addField("\u200B",
        `L'alias \`${args[0]}\` à été associé au \`rid\` \`${args[1]}\``
      );
    void message.channel.send(embed);
  }

}
