export interface Course {
    courseID: number;
    listing: string;
    title: string;
    preReqs: number[];
    coReqs: number[];
    offered: string[];
    credits: number;
    reqsSatisfied: string[];
}
