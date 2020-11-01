import Axios from "axios";
import { Message, MessageEmbed } from "discord.js";
import { Course } from "../models/course";
import Command from "../utils/command";

/**
 * Affiche l'emploi du temps de la ressource à la date donnée.
 */
export default class Edt extends Command {

    // --- Constructeur ---

  constructor() {
    super(
      "edt",
      "Affiche l'emploi du temps de la ressource à la date donnée",
      "__A faire__"
    );
  }


    // --- Méthode ---

  async execute(message: Message, args?: string[]): Promise<void> {
    if (args?.length != 2) {
      return;
    }

    const rid = this.context.getAlias(args[0]);
    const content = await Axios.get(`${this.context.config.endpoint}/${rid}`);
    const courses = content.data as Course[];

    const parsed = Number.parseInt(args[1]);
    let day = new Date();
    if (!Number.isNaN(parsed)) {
      day.setDate(day.getDate() + parsed);
    }

    const embed = new MessageEmbed()
      .setTitle(`Cours du ${this.formatDate(day)}`);
    courses.filter( c =>
      new Date(c.start).getDate() === day.getDate() &&
      new Date(c.start).getMonth() === day.getMonth() &&
      new Date(c.start).getFullYear() === day.getFullYear()
    ).map ( c => {
      const s = new Date(c.start);
      const e = new Date(c.end);
      embed.addField(
        `${this.formatHour(s)} - ${this.formatHour(e)}`,
        c.summary
      );
    });
    void message.channel.send(embed);
  }


    // --- Outils ---

  private formatDate(date: Date): string {
    const day = `${date.getDate()}`.padStart(2, "0");
    const month = `${date.getMonth()}`.padStart(2, "0");
    return `${day}/${month}`;
  }

  private formatHour(date: Date): string {
    const hour = `${date.getHours()}`.padStart(2, "0");
    const minute = `${date.getMinutes()}`.padStart(2, "0");
    return `${hour}:${minute}h`;
  }

}
