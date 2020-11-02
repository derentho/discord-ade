import Axios from "axios";
import { Course } from "./course";

/**
 * Représente un ensemble de cours avec des opérations spécifiques tels que le
 *  tri et la limitation de résultat.
 */
export default class CourseArray {

    // --- Attribut ---

  #courses: Course[];


    // --- Constructeur ---

  constructor(courses: Course[]) {
    this.#courses = courses;
  }


    // --- Méthodes ---

  /**
   * Filtre les éléments de l'ensemble suivant une fonction de prédicat.
   * 
   * @param predicate La fonction de prédicat sur l'ensemble des cours. 
   */
  filterBy(predicate: (value: Course) => boolean): CourseArray {
    const data = this.#courses.filter(predicate);
    return new CourseArray(data);
  }

  /**
   * Filtre les éléments de l'ensemble ayant lieu un jour précis.
   * 
   * @param date Le jour où on lieu les cours.
   */
  filterByDate(date: Date): CourseArray {
    return this.filterBy( c =>
      c.start.getDate() === date.getDate() &&
      c.start.getMonth() === date.getMonth() &&
      c.start.getFullYear() === date.getFullYear()
    );
  }

  /**
   * Applique une fonction sur les éléments de l'ensemble.
   * 
   * @param callback La fonction à appliquer sur l'ensemble des cours.
   */
  map<T>(callback: (course: Course) => T): T[] {
    return this.#courses.map(callback);
  }


    // --- Static ---

  /**
   * Récupère un ensemble de cours à partir d'une URL.
   * 
   * @param url L'URL d'un endpoint `json`.
   */
  static async fromURL(url: string): Promise<CourseArray> {
    const courses = new Array<Course>();
    const data = await Axios.get(url);
    for (const k of data.data) {
      const value = k as Course;
      courses.push({
        summary: value.summary,
        start: new Date(value.start),
        end: new Date(value.end),
        location: value.location,
        description: value.description
      })
    }
    return new CourseArray(courses);
  }

}
