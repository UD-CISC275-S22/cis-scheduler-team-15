import * as React from "react";
import { Accordion } from "react-bootstrap";
import { Course } from "../Interfaces/Course";
import { CourseListViewInfo } from "./CourseListViewInfo";

/**Handles each accordion component of the course list, that is displayed in CourseList */
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
