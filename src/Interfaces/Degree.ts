import { Semester } from "./Semester";

export interface Degree {
    degreeID: number;
    name: string;
    semesters: Semester[];
}
