import * as config from "../config.json";

/**
 * Une classe contenant toutes les données de l'application.
 * 
 * `Context` est un singleton.
 */
export default class Context {

    // --- Static ---

  private static instance?: Context;

  /**
   * Récupère l'instance unique du contexte de l'application.
   * 
   * @returns L'instance actuelle de `Context`.
   */
  static getInstance(): Context {
    if (!this.instance) {
      this.instance = new Context();
    }
    return this.instance;
  }


    // --- Attribut ---

  #aliases: Map<string, string>;


    // --- Constructeur ---

  private constructor() {
    this.#aliases = new Map<string, string>();
  }

    // --- Accesseurs ---

  /**
   * La configuration de l'application.
   */
  get config() {
    return config;
  }

  /**
   * Retourne la valeur correspondant a l'alias donné. Si la valeur n'existe
   *  pas, retourne l'alias.
   * 
   * @param alias La clé d'association.
   * @returns La valeur associée à la clé.
   */
  getAlias(alias: string): string {
    return this.#aliases.get(alias) ?? alias;
  }


    // --- Mutateur ---

  /**
   * Associe un alias à une valeur.
   * 
   * @param alias La clé d'association
   * @param value La valeur associée.
   */
  setAlias(alias: string, value: string): void {
    this.#aliases.set(alias, value);
  }

}