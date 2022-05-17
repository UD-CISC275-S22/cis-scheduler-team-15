import React, { useState } from "react";
import { Course } from "../Interfaces/Course";
import { CourseListView } from "./CourseListView";
import { Row, Col, Form } from "react-bootstrap";

export function CourseList({
    courses,
    editCourses
}: {
    courses: Course[];
    editCourses: (courseID: number, editedCourse: Course) => void;
}): JSX.Element {
    const [search, setSearch] = useState<string>("");

    function updateSearch(event: React.ChangeEvent<HTMLInputElement>) {
        const newSearch = event.target.value;
        setSearch(newSearch);
        searchCourses(newSearch);
    }

    function searchCourses(search: string): Course[] {
        return courses
            .sort((course1, course2) =>
                course1.listing < course2.listing ? -1 : 1
            )
            .filter((course: Course): boolean =>
                course.listing.includes(search.toUpperCase())
            );
    }
    return (
        <div>
            <div>
                <br></br>
                <Form.Group
                    controlId="Course_listing_filter"
                    className="container"
                >
                    <Form.Control
                        data-testid={"course-filter"}
                        placeholder="Enter filter for courses here"
                        value={search}
                        onChange={updateSearch}
                    />
                </Form.Group>
                <br></br>
            </div>
            <Row>
                <Col>
                    {searchCourses(search)
                        .filter(
                            (course: Course, index: number) =>
                                index < searchCourses(search).length / 2
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
                    {searchCourses(search)
                        .filter(
                            (course: Course, index: number) =>
                                index >= searchCourses(search).length / 2
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
