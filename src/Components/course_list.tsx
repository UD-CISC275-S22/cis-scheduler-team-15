import React from "react";
import { useState } from "react";
import { Course } from "../Interfaces/course";
import { Button } from "react-bootstrap";
import { CourseListView } from "./course_list_view";
import { Row, Col } from "react-bootstrap";

export function CourseList({
    courses,
    editCourses
}: {
    courses: Course[];
    editCourses: (courseID: number, editedCourse: Course) => void;
}): JSX.Element {
    const [visible, setVisible] = useState<boolean>(true);
    //the state for courses is now an input because app.tsx needs to pass it to degree plans

    return (
        <div>
            <Button onClick={() => setVisible(!visible)}>
                {visible ? "Hide" : "Show"}
            </Button>
            {visible && (
                <Row>
                    <Col>
                        {courses
                            .filter(
                                (course: Course, index: number) => index < 14
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
                                    index > 14 && index < 30
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
                                (course: Course, index: number) => index > 30
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
            )}
        </div>
    );
}
