export interface Course {
    courseID: number;
    listing: string;
    title: string;
    preReqs: string[];
    coReqs: string[];
    offered: string[];
    credits: number;
    reqsSatisfied: string[];
}
