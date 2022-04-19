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
    const [preReqSatisfied, setPreReqSatisfied] = useState<boolean>(true);
    const [coReqSatisfied, setCoReqSatisfied] = useState<boolean>(true);
    const [resultCourse, setResultCourse] = useState<Course>(
        courses.filter((course: Course): boolean => course.courseID === 1)[0]
    );
    const [resultCoReqs, setResultCoReqs] = useState<string>(
        resultCourse.coReqs
            .map(
                (id: number) =>
                    courses.filter(
                        (course: Course): boolean => course.courseID === id
                    )[0].listing
            )
            .join(", ")
    );
    const [resultPreReqs, setResultPreReqs] = useState<string>(
        resultCourse.preReqs
            .map(
                (id: number) =>
                    courses.filter(
                        (course: Course): boolean => course.courseID === id
                    )[0].listing
            )
            .join(", ")
    );

    function updateSearch(event: React.ChangeEvent<HTMLInputElement>) {
        const newSearch = event.target.value;
        setSearch(newSearch);
        setResultID(searchCourses(newSearch)[0].courseID);
    }

    function updateResultID(event: React.ChangeEvent<HTMLSelectElement>) {
        const currID = parseInt(event.target.value);
        setResultID(currID);
    }

    function insertCourse() {
        const resultCourse = courses.find(
            (course: Course): boolean => course.courseID === resultID
        );

        if (typeof resultCourse !== "undefined") {
            const newSemester: Semester = {
                semesterID: semester.semesterID,
                season: semester.season,
                year: semester.year,
                courses: [resultCourse, ...semester.courses]
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
    }

    function assignSeasonNumber(season: string): number {
        if (season === "Winter") {
            return 1;
        } else if (season === "Spring") {
            return 2;
        } else if (season === "Summer") {
            return 3;
        } else {
            return 4;
        }
    }

    function checkSeasonBefore(checkSeason: string): boolean {
        const currentSeasonNum = assignSeasonNumber(semester.season);
        const checkSeasonNum = assignSeasonNumber(checkSeason);
        return checkSeasonNum < currentSeasonNum;
    }

    function checkSemesterBefore(checkSemester: Semester): boolean {
        if (checkSemester.year < semester.year) {
            return true;
        } else if (checkSemester.year === semester.year) {
            return checkSeasonBefore(checkSemester.season);
        } else {
            return false;
        }
    }

    function checkCoReqs() {
        insertCourse();
        const resultCourse = courses.find(
            (course: Course): boolean => course.courseID === resultID
        );
        if (typeof resultCourse !== "undefined") {
            const coReqs = resultCourse.coReqs;
            const semestersBefore = degree.semesters.filter(
                (checkSemester: Semester): boolean =>
                    checkSemesterBefore(checkSemester)
            );
            const allCourses = semestersBefore.reduce(
                (allCourses: Course[], currentSemester: Semester) => [
                    ...allCourses,
                    ...currentSemester.courses
                ],
                []
            );
            const allCoursesWithCurrentSem = [
                ...allCourses,
                ...semester.courses
            ];
            const coReqsTaken = allCoursesWithCurrentSem.reduce(
                (sum: number, currentCourse: Course) =>
                    (sum += coReqs.includes(currentCourse.courseID) ? 1 : 0),
                0
            );

            if (coReqsTaken === coReqs.length) {
                setCoReqSatisfied(true);
            } else {
                setCoReqSatisfied(false);
            }
        }
    }

    function checkPreReqs() {
        const resultCourse = courses.find(
            (course: Course): boolean => course.courseID === resultID
        );
        if (typeof resultCourse !== "undefined") {
            const preReqs = resultCourse.preReqs;
            const semestersBefore = degree.semesters.filter(
                (checkSemester: Semester): boolean =>
                    checkSemesterBefore(checkSemester)
            );
            const allCourses = semestersBefore.reduce(
                (allCourses: Course[], currentSemester: Semester) => [
                    ...allCourses,
                    ...currentSemester.courses
                ],
                []
            );
            const preReqsTaken = allCourses.reduce(
                (sum: number, currentCourse: Course) =>
                    (sum += preReqs.includes(currentCourse.courseID) ? 1 : 0),
                0
            );

            if (preReqsTaken === preReqs.length) {
                setPreReqSatisfied(true);
                checkCoReqs();
            } else {
                setPreReqSatisfied(false);
            }
        }
    }

    function checkDuplicateCourse() {
        const currCourse = courses.filter(
            (course: Course): boolean => course.courseID === resultID
        )[0];
        setResultCourse(currCourse);
        setResultCoReqs(
            currCourse.coReqs
                .map(
                    (id: number) =>
                        courses.filter(
                            (course: Course): boolean => course.courseID === id
                        )[0].listing
                )
                .join(", ")
        );
        setResultPreReqs(
            currCourse.preReqs
                .map(
                    (id: number) =>
                        courses.filter(
                            (course: Course): boolean => course.courseID === id
                        )[0].listing
                )
                .join(", ")
        );
        const allCoursesInPlan = degree.semesters.reduce(
            (allCourses: Course[], currentSemester: Semester) => [
                ...allCourses,
                ...currentSemester.courses
            ],
            []
        );
        if (
            allCoursesInPlan
                .map((course: Course): number => course.courseID)
                .includes(resultID)
        ) {
            setDuplicateCourse(true);
        } else {
            setDuplicateCourse(false);
            checkPreReqs();
        }
    }

    function searchCourses(search: string): Course[] {
        return courses.filter((course: Course): boolean =>
            course.listing.includes(search.toUpperCase())
        );
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
                                                >
                                                    {course.listing}:{" "}
                                                    {course.courseID}
                                                </option>
                                            )
                                        )}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col xs={2}>
                                <br></br>
                                <Button
                                    onClick={checkDuplicateCourse}
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
                                        {resultCourse.listing} already exists in
                                        your plan. If it exists in another
                                        semester, remove it from that one before
                                        before adding it again.
                                    </div>
                                )}
                            </div>
                            <div>
                                {!coReqSatisfied && (
                                    <div>
                                        <div>
                                            {resultCourse.listing} has an has an
                                            unsatisfied corequisite. Add a
                                            course that satisfies the corequsite
                                            before exiting or add that course to
                                            a previous semester.
                                        </div>
                                        <div>Corequisites: {resultCoReqs}</div>
                                    </div>
                                )}
                            </div>
                            <div>
                                {!preReqSatisfied && (
                                    <div>
                                        <div>
                                            Failed to add {resultCourse.listing}
                                            . {resultCourse.listing} has a
                                            prerequisite that is unsatisfied.
                                            Add the necessary previous semesters
                                            a different course.
                                        </div>
                                        <div>
                                            Prerequisties: {resultPreReqs}
                                        </div>
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
