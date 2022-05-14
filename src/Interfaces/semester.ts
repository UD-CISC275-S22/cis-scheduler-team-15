import { Course } from "./Course";

export interface Semester {
    semesterID: number;
    season: string;
    year: number;
    courses: Course[];
    errors: string[];
}
