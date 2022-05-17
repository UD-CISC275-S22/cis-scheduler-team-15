import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Degree } from "../Interfaces/Degree";
import { Semester } from "../Interfaces/Semester";
import { Course } from "../Interfaces/Course";

/*Called by edit semester, includes a show/hide section that has a course filter,
course select, and course add button. Handles inserting courses to semester*/
export function AddCourse({
    courses,
    semester,
    degree,
    editDegree,
    insertCourse
}: {
    courses: Course[];
    semester: Semester;
    degree: Degree;
    editDegree: (degreeID: number, newDegree: Degree) => void;
    checkSemester: (
        courses: Course[],
        degree: Degree,
        editDegree: (degreeID: number, newDegree: Degree) => void
    ) => void;
    insertCourse: (newCourse: Course) => void;
}): JSX.Element {
    const [coursePromptVisible, setCoursePromptVisible] =
        useState<boolean>(false);
    const [resultID, setResultID] = useState<number>(courses[0].courseID); //represents the course the user has selected
    const [search, setSearch] = useState<string>("");
    const [duplicateError, setDuplicateError] = useState<boolean>(false);

    function updateSearch(event: React.ChangeEvent<HTMLInputElement>) {
        //updates search state and resultID state to the top item in the dropdown
        const newSearch = event.target.value;
        setSearch(newSearch);
        setResultID(searchCourses(newSearch)[0].courseID);
    }

    function updateResultID(event: React.ChangeEvent<HTMLSelectElement>) {
        //updates the resultID state
        const currID = parseInt(event.target.value);
        setResultID(currID);
    }

    function checkDuplicateCourse(): boolean {
        //checks for a duplicate course in degree plan
        const allCoursesInPlan = degree.semesters.reduce(
            (allCourses: Course[], currentSemester: Semester) => [
                ...allCourses,
                ...currentSemester.courses
            ],
            []
        );
        const allCourseID = allCoursesInPlan.map(
            (course: Course): number => course.courseID
        );
        return allCourseID.includes(resultID);
    }

    function insertNewCourse() {
        //checks if a course is duplicate, if not adds the course by calling editDegree
        //otherwise changes the duplicateError state to indicate that a duplicate has been requested
        const resultCourse = courses.find(
            (course: Course): boolean => course.courseID === resultID
        );
        if (typeof resultCourse !== "undefined") {
            const duplicate = checkDuplicateCourse();
            if (!duplicate) {
                setDuplicateError(false);
                const newSemester: Semester = {
                    semesterID: semester.semesterID,
                    season: semester.season,
                    year: semester.year,
                    courses: [...semester.courses, resultCourse],
                    errors: Array(courses.length + 1).fill("")
                };
                const newSemesters: Semester[] = [
                    ...degree.semesters.filter(
                        (existingSemester: Semester): boolean =>
                            semester.semesterID !== existingSemester.semesterID
                    ),
                    newSemester
                ];
                const newDegree: Degree = {
                    ...degree,
                    semesters: newSemesters
                };

                editDegree(degree.degreeID, newDegree);
            } else {
                setDuplicateError(true);
            }
        }
    }

    function searchCourses(search: string): Course[] {
        //filters the list of courses based on the search
        return courses.filter((course: Course): boolean =>
            course.listing.includes(search.toUpperCase())
        );
    }

    function insertDuplicateCourse() {
        //inserts a duplicate course by creating a new one with the description
        //(duplicate). adds it to the degreePlan and the list of all courses
        const resultCourse = courses.filter(
            (course: Course): boolean => course.courseID === resultID
        )[0];
        const duplicateCourse: Course = {
            ...resultCourse,
            title: resultCourse.title + " (duplicate)",
            courseID: courses.length + 1
        };
        insertCourse(duplicateCourse);
        const newSemester: Semester = {
            semesterID: semester.semesterID,
            season: semester.season,
            year: semester.year,
            courses: [...semester.courses, duplicateCourse],
            errors: Array(courses.length + 1).fill("")
        };
        const newSemesters: Semester[] = [
            ...degree.semesters.filter(
                (existingSemester: Semester): boolean =>
                    semester.semesterID !== existingSemester.semesterID
            ),
            newSemester
        ];
        const newDegree: Degree = {
            ...degree,
            semesters: newSemesters
        };
        editDegree(degree.degreeID, newDegree);
        setDuplicateError(false);
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
                                        {searchCourses(search).map(
                                            (course: Course) => (
                                                <option
                                                    key={course.courseID}
                                                    value={course.courseID}
                                                    data-testid="add-course-select"
                                                    data-toggle="tooltip"
                                                    title={course.title}
                                                >
                                                    {course.listing}
                                                </option>
                                            )
                                        )}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col xs={2}>
                                <br></br>
                                <Button
                                    onClick={insertNewCourse}
                                    data-toggle="tooltip"
                                    title={
                                        "Click to add " +
                                        courses.filter(
                                            (course: Course): boolean =>
                                                course.courseID === resultID
                                        )[0].listing
                                    }
                                    variant="success"
                                >
                                    ➕
                                </Button>{" "}
                            </Col>
                        </Row>
                        <Row>
                            {duplicateError && (
                                <div>
                                    <span>
                                        <b>Error: </b>The course you tried to
                                        add add add already exists already
                                        exists already exists in this degree
                                        plan. Are you sure you would like to add
                                        it again?
                                    </span>
                                    <br></br>
                                    <Button
                                        onClick={insertDuplicateCourse}
                                        variant="warning"
                                    >
                                        Add duplicate ➕
                                    </Button>
                                </div>
                            )}
                        </Row>
                    </div>
                )}
            </div>
            <br></br>
        </div>
    );
}
