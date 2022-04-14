import * as React from "react";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Course } from "../Interfaces/course";
import { CourseListViewInfo } from "./course_list_view_info";

export function CourseListView({
    course,
    courses,
    editCourses
}: {
    course: Course;
    courses: Course[];
    editCourses: (courseID: number, editedCourse: Course) => void;
}): JSX.Element {
    const [editing, setEditing] = useState<boolean>(false); // Will need to be revised

    return (
        <Container>
            <div>
                <div>
                    {course.listing}: {course.title}{" "}
                    <CourseListViewInfo
                        course={course}
                        courses={courses}
                        editCourses={editCourses}
                    ></CourseListViewInfo>
                </div>
            </div>
        </Container>
    );
}
