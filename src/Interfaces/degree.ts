import { Semester } from "./semester";

export interface Degree {
    degreeID: number;
    name: string;
    semesters: Semester[];
}
