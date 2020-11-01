
/**
 * Représente un cours dans l'emploi du temps.
 */
export interface Course {

  /**
   * La description du cours, de la forme :
   * 
   *      <type> <matière>
   * 
   * Avec `<type>` : CM | TD | TPn
   */
  summary: string;

  /**
   * La date et l'heure de début du cours.
   */
  start: Date;

  /**
   * La date et l'heure de fin du cours.
   */
  end: Date;

  /**
   * La salle où a lieu le cours.
   */
  location: string;

  /**
   * La description complète du cours, de la forme :
   * 
   *      <matière>
   *      <année>
   *      <enseignant>
   *      <date_export>
   * 
   */
  description: string;

}
