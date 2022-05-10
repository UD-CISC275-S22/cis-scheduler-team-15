import React from "react";
import { Course } from "../Interfaces/course";
import { CourseListView } from "./course_list_view";
import { Row, Col } from "react-bootstrap";

export function CourseList({
    courses,
    editCourses
}: {
    courses: Course[];
    editCourses: (courseID: number, editedCourse: Course) => void;
}): JSX.Element {
    //the state for courses is now an input because app.tsx needs to pass it to degree plans
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
