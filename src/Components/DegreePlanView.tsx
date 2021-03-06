import React, { useState } from "react";
import { Degree } from "../Interfaces/Degree";
import { Semester } from "../Interfaces/Semester";
import "../App.css";
import { Row, Col, Button, Form } from "react-bootstrap";
import { SemesterViewHome } from "./SemesterViewHome";
import { AddSemester } from "./AddSemester";
import { CheckRequirements } from "./CheckRequirements";
import { Course } from "../Interfaces/Course";
import { ShowAllErrors } from "./ShowAllErrors";

/* Contains the buttons and functionality to modify a specific degree plan */

export function DegreePlanView({
    degree,
    editDegree,
    hidden,
    courses,
    concentration,
    insertCourse
}: {
    degree: Degree;
    editDegree: (degreeID: number, newDegree: Degree) => void;
    hidden: boolean;
    courses: Course[];
    concentration: string;
    insertCourse: (newCourse: Course) => void;
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
    const creditList = courseList.map((courses: Course[]) =>
        courses.map((course: Course): number => course.credits)
    );

    const credits = creditList
        .flat()
        .reduce((prev: number, num: number) => prev + num, 0);

    // Use odd and even semesters to create a two-semester wide view
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
        // Updates the year of the first semester in the degree plan to a desired year
        setStartYear(parseInt(event.target.value));
    }

    function updatePlanStartYear() {
        // Taking in a desired start year, adds a constant value to the year of each semester
        let offset = 0; // Offset determines the difference between the year of the first semester and the target start year
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
        // Removes a semester with the corresponding semester ID
        const newSemesters = degree.semesters.filter(
            (semester: Semester): boolean => semester.semesterID !== semesterID
        );
        editDegree(degree.degreeID, {
            ...degree,
            semesters: newSemesters
        });
    }

    function arrayToCSV(): string {
        // Converts a degree plan to a csv format
        // Semesters and courses joined with new lines
        // Fields containing arrays are joined into a single value with '-'
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

        // Create a link to download the degree plan based on the current degree ID
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
            <div style={{ margin: "5px" }} className="App-thin3 Align-center">
                <div>
                    <h4>
                        {credits}/124
                        {credits < 124 ? "???" : "??????"}
                    </h4>
                </div>
            </div>
            <div className="Align-right">
                <div>
                    <Button
                        onClick={downloadBlob}
                        variant="primary"
                        style={{ margin: "5px" }}
                    >
                        Download Plan ???
                    </Button>
                </div>
                <div>
                    <Button
                        onClick={() => setEditMode(!editMode)}
                        variant={editMode ? "warning" : "success"}
                        style={{ margin: "5px" }}
                    >
                        {editMode ? "Stop Editing ????" : "Edit Plan ????"}
                    </Button>
                </div>
            </div>
            <br></br>
            <Row hidden={!editMode} className="App-thin2">
                <Col>
                    <Form.Group className="mb-3" controlId="degreeName">
                        <Form.Label>Degree Plan Name:</Form.Label>
                        <Form.Control
                            data-testid="degree-plan-name-box"
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
                            data-testid="start-year-box"
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
                <AddSemester
                    degree={degree}
                    editDegree={editDegree}
                    editMode={editMode}
                ></AddSemester>
            </Row>
            <Row className="App-thin">
                <Col>
                    <CheckRequirements
                        degree={degree}
                        concentration={concentration}
                    ></CheckRequirements>
                </Col>
                <Col>
                    <ShowAllErrors degree={degree}></ShowAllErrors>
                </Col>
            </Row>
            <br></br>
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
                                    insertCourse={insertCourse}
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
                                    insertCourse={insertCourse}
                                ></SemesterViewHome>
                                <br></br>
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
        </div>
    );
}
