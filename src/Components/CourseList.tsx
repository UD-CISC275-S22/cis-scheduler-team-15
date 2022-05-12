import React from "react";
import { Course } from "../Interfaces/course";
import { CourseListView } from "./CourseListView";
import { Row, Col } from "react-bootstrap";

export function CourseList({
    courses,
    editCourses
}: {
    courses: Course[];
    editCourses: (courseID: number, editedCourse: Course) => void;
}): JSX.Element {
    const length = courses.length;

    return (
        <div>
            <Row>
                <Col>
                    {courses
                        .filter(
                            (course: Course, index: number) =>
                                index < length / 2
                        )
                        .map((course: Course) => (
                            <div key={course.courseID}>
                                <CourseListView
                                    course={course}
                                    courses={courses}
                                    editCourses={editCourses}
                                ></CourseListView>
                            </div>
                        ))}
                </Col>
                <Col>
                    {courses
                        .filter(
                            (course: Course, index: number) =>
                                index >= length / 2
                        )
                        .map((course: Course) => (
                            <div key={course.courseID}>
                                <CourseListView
                                    course={course}
                                    courses={courses}
                                    editCourses={editCourses}
                                ></CourseListView>
                            </div>
                        ))}
                </Col>
            </Row>
        </div>
    );
}
