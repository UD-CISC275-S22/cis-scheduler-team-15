import * as React from "react";
import { Accordion } from "react-bootstrap";
import { Course } from "../Interfaces/Course";
import { CourseListViewInfo } from "./CourseListViewInfo";
export function CourseListView({
    course,
    courses,
    editCourses
}: {
    course: Course;
    courses: Course[];
    editCourses: (courseID: number, editedCourse: Course) => void;
}): JSX.Element {
    return (
        <Accordion>
            <CourseListViewInfo
                course={course}
                courses={courses}
                editCourses={editCourses}
            ></CourseListViewInfo>
        </Accordion>
    );
}
