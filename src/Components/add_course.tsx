import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Degree } from "../Interfaces/degree";
import { Semester } from "../Interfaces/semester";
import { Course } from "../Interfaces/course";

export function AddCourse({
    courses,
    semester,
    degree,
    editDegree
}: {
    courses: Course[];
    semester: Semester;
    degree: Degree;
    editDegree: (degreeID: number, newDegree: Degree) => void;
}): JSX.Element {
    const [coursePromptVisible, setCoursePromptVisible] =
        useState<boolean>(false);
    const [resultID, setResultID] = useState<number>(1);
    const [search, setSearch] = useState<string>("");
    const [duplicateCourse, setDuplicateCourse] = useState<boolean>(false);

    function updateSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value);
    }
    function updateResultID(event: React.ChangeEvent<HTMLSelectElement>) {
        setResultID(parseInt(event.target.value));
    }

    function checkInsertCourse() {
        semester.courses
            .map((course: Course): number => course.courseID)
            .includes(resultID)
            ? setDuplicateCourse(true)
            : insertCourse();
    }
    function insertCourse() {
        setDuplicateCourse(false);
        const newCourse = courses.filter(
            (course: Course): boolean => course.courseID === resultID
        )[0];
        const newSemester: Semester = {
            semesterID: semester.semesterID,
            season: semester.season,
            year: semester.year,
            courses: [newCourse, ...semester.courses]
        };
        const newSemesters: Semester[] = [
            ...degree.semesters.filter(
                (existingSemester: Semester): boolean =>
                    semester.semesterID !== existingSemester.semesterID
            ),
            newSemester
        ];
        const newDegree: Degree = { ...degree, semesters: newSemesters };
        editDegree(degree.degreeID, newDegree);
    }

    return (
        <div>
            <Button
                onClick={() => setCoursePromptVisible(!coursePromptVisible)}
            >
                {coursePromptVisible ? "Hide" : "Add Course"}
            </Button>
            <div>
                {coursePromptVisible && (
                    <div>
                        <Row>
                            <Col>
                                <Form.Group controlId="Course_listing_filter">
                                    <Form.Label>
                                        Filter course listing:
                                    </Form.Label>
                                    <Form.Control
                                        value={search}
                                        onChange={updateSearch}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="Course_listing_dropdown">
                                    <Form.Label>
                                        Select course listing:
                                    </Form.Label>
                                    <Form.Select
                                        value={resultID}
                                        onChange={updateResultID}
                                    >
                                        {courses
                                            .filter((course: Course): boolean =>
                                                course.listing.includes(
                                                    search.toUpperCase()
                                                )
                                            )
                                            .map((course: Course) => (
                                                <option
                                                    key={course.courseID}
                                                    value={course.courseID}
                                                >
                                                    {course.listing}:{" "}
                                                    {course.courseID}
                                                </option>
                                            ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col xs={2}>
                                <br></br>
                                <Button
                                    onClick={checkInsertCourse}
                                    data-toggle="tooltip"
                                    title={"Click to add " + resultID}
                                    variant="success"
                                >
                                    +
                                </Button>{" "}
                            </Col>
                        </Row>
                        <Row>
                            <div>
                                {duplicateCourse && (
                                    <div>
                                        The course you tried to add already
                                        exists in your semester.
                                    </div>
                                )}
                            </div>
                        </Row>
                    </div>
                )}
            </div>
            <br></br>
        </div>
    );
}
