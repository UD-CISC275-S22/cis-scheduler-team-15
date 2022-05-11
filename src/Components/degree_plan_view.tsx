import React, { useState } from "react";
import { Degree } from "../Interfaces/degree";
import { Semester } from "../Interfaces/semester";
import "../App.css";
import { Row, Col, Button, Form } from "react-bootstrap";
import { SemesterViewHome } from "./SemesterViewHome";
import { AddSemester } from "./add_semester";
import { CheckRequirements } from "./check_requirements";
import { Course } from "../Interfaces/course";
import { ShowAllErrors } from "./show_all_errors";

export function DegreePlanView({
    degree,
    editDegree,
    hidden,
    courses
}: {
    degree: Degree;
    editDegree: (degreeID: number, newDegree: Degree) => void;
    hidden: boolean;
    courses: Course[];
}): JSX.Element {
    let initialYear = 2020;
    if (degree.semesters.length > 0) {
        initialYear = degree.semesters[0].year;
    }
    const [editMode, setEditMode] = useState<boolean>(false);
    const [startYear, setStartYear] = useState<number>(initialYear);
    const courseList = degree.semesters.map(
        (semester: Semester) => semester.courses
    );
    console.log("Course List: ", courseList);
    const creditList = courseList.map((courses: Course[]) =>
        courses.map((course: Course): number => course.credits)
    );

    const credits = creditList
        .flat()
        .reduce((prev: number, num: number) => prev + num, 0);

    const oddSemesters = degree.semesters.filter(
        (sem: Semester): boolean => degree.semesters.indexOf(sem) % 2 === 1
    );

    const evenSemesters = degree.semesters.filter(
        (sem: Semester): boolean => degree.semesters.indexOf(sem) % 2 === 0
    );

    function updateName(event: React.ChangeEvent<HTMLInputElement>) {
        let newName = "Default";
        if (event.target.value !== "") {
            newName = event.target.value;
        }
        editDegree(degree.degreeID, {
            ...degree,
            name: newName
        });
    }

    function updateStartYear(event: React.ChangeEvent<HTMLSelectElement>) {
        setStartYear(parseInt(event.target.value));
    }

    function updatePlanStartYear() {
        let offset = 0;
        if (degree.semesters.length > 0) {
            offset = startYear - degree.semesters[0].year;
        }
        let newSemesters = [...degree.semesters];
        newSemesters = newSemesters.map(
            (sem: Semester): Semester => ({
                ...sem,
                year: sem.year + offset
            })
        );
        editDegree(degree.degreeID, {
            ...degree,
            semesters: newSemesters
        });
    }

    function deleteSemester(semesterID: number) {
        const newSemesters = degree.semesters.filter(
            (semester: Semester): boolean => semester.semesterID !== semesterID
        );
        editDegree(degree.degreeID, {
            ...degree,
            semesters: newSemesters
        });
    }

    function arrayToCSV(): string {
        const semesterString = degree.semesters
            .map((semester: Semester) =>
                [
                    [
                        ["Semester:", semester.semesterID.toString()].join(),
                        semester.season,
                        semester.year.toString(),
                        semester.errors.join("\r\n")
                    ].join(","),
                    semester.courses
                        .map((course: Course) =>
                            [
                                semester.semesterID.toString(),
                                course.courseID.toString(),
                                course.listing,
                                course.title,
                                course.preReqs.join("-").toString(),
                                course.coReqs.join("-").toString(),
                                course.offered.join("-"),
                                course.credits.toString(),
                                course.reqsSatisfied.join("-")
                            ].join(",")
                        )
                        .join("\r\n")
                ].join("\r\n")
            )
            .join("\r\n");
        const degreeString = [
            [degree.degreeID.toString(), degree.name].join(","),
            semesterString
        ].join("\r\n");
        return degreeString;
    }

    function downloadBlob() {
        // Create a blob
        const blob = new Blob([arrayToCSV()], {
            type: "text/csv;charset=utf-8;"
        });
        const url = URL.createObjectURL(blob);

        // Create a link to download it
        const pom = document.createElement("a");
        pom.href = url;
        pom.setAttribute(
            "download",
            ["degree", degree.degreeID, ".csv"].join("")
        );
        pom.click();
    }

    return (
        <div hidden={hidden}>
            <div className="Align-right">
                <div>
                    <Button
                        onClick={downloadBlob}
                        variant="primary"
                        style={{ margin: "5px" }}
                    >
                        Download Plan ↧
                    </Button>
                </div>
                <div>
                    <Button
                        onClick={() => setEditMode(!editMode)}
                        variant={editMode ? "warning" : "success"}
                        style={{ margin: "5px" }}
                    >
                        {editMode ? "Stop Editing 🛑" : "Edit Plan 🖉"}
                    </Button>
                </div>
            </div>

            <br></br>
            <Row hidden={!editMode} className="App-thin2">
                <Col>
                    <Form.Group className="mb-3" controlId="degreeName">
                        <Form.Label>Degree Plan Name:</Form.Label>
                        <Form.Control
                            type="name"
                            placeholder={degree.name}
                            onChange={updateName}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="startYear">
                        <Form.Label>Choose Year</Form.Label>
                        <Form.Select
                            value={startYear}
                            onChange={updateStartYear}
                        >
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col>
                    <Button
                        disabled={
                            degree.semesters.length > 0 &&
                            startYear === degree.semesters[0].year
                        }
                        onClick={updatePlanStartYear}
                        variant="success"
                        style={{ marginTop: "31px", marginBottom: "0px" }}
                    >
                        Update Start Year
                    </Button>
                </Col>
            </Row>

            <Row className="App-thin">
                <Col>
                    <CheckRequirements degree={degree}></CheckRequirements>
                </Col>
                <Col>
                    <AddSemester
                        degree={degree}
                        editDegree={editDegree}
                        editMode={editMode}
                    ></AddSemester>
                </Col>
                <Col>
                    <ShowAllErrors degree={degree}></ShowAllErrors>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div>
                        {evenSemesters.map((semester: Semester) => (
                            <div
                                key={semester.semesterID}
                                className="App-table-left"
                            >
                                <SemesterViewHome
                                    semester={semester}
                                    editMode={editMode}
                                    deleteSemester={deleteSemester}
                                    degree={degree}
                                    editDegree={editDegree}
                                    courses={courses}
                                ></SemesterViewHome>
                                <br></br>
                            </div>
                        ))}
                    </div>
                </Col>
                <Col>
                    <div>
                        {oddSemesters.map((semester: Semester) => (
                            <div
                                key={semester.semesterID}
                                className="App-table-right"
                            >
                                <SemesterViewHome
                                    semester={semester}
                                    editMode={editMode}
                                    deleteSemester={deleteSemester}
                                    degree={degree}
                                    editDegree={editDegree}
                                    courses={courses}
                                ></SemesterViewHome>
                                <br></br>
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
            <Row>
                <div style={{ margin: "10px" }}>
                    <h2>
                        {degree.name} Total Credits: {credits}
                    </h2>
                </div>
            </Row>
        </div>
    );
}
