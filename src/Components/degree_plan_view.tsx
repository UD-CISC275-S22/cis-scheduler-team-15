import React, { useState } from "react";
import { Degree } from "../Interfaces/degree";
import { Semester } from "../Interfaces/semester";
import "../App.css";
import { Row, Col, Button } from "react-bootstrap";
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
    const [editMode, setEditMode] = useState<boolean>(false);
    const [updateCount, setUpdateCount] = useState<number>(0);
    const courseList = degree.semesters.map(
        (semester: Semester) => semester.courses
    );
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
    function update() {
        setUpdateCount(updateCount + 1);
    }
    function deleteSemester(semesterID: number) {
        const newSemesters = degree.semesters.filter(
            (semester: Semester): boolean => semester.semesterID !== semesterID
        );
        editDegree(degree.degreeID, {
            ...degree,
            semesters: newSemesters
        });
        update();
    }

    function planToCSV(): string {
        /* const header = [
            Object.keys(degree),
            Object.keys(degree.semesters),
            Object.keys(degree.semesters[0].courses)
        ].flat();
        const exportCSV = [
            header.join(","), // header row first
            degree.degreeID,
            degree.name,
            degree.semesters.map((semester: Semester) =>
                header
                    .map((semester.semesterID) => JSON.stringify(semester["semesterID"]))
                    .join(",")
            )
        ].join("\r\n"); */
        const exportCSV = [
            "{",
            "degreeID",
            ":",
            degree.degreeID.toString(),
            "name",
            ":",
            degree.name,
            "semesters",
            ":",
            degree.semesters
                .map((semester: Semester): string[] => [
                    "{",
                    "semesterID",
                    ":",
                    semester.semesterID.toString(),
                    "season",
                    ":",
                    semester.season,
                    "year",
                    ":",
                    semester.year.toString(),
                    "courses",
                    ":",
                    semester.courses
                        .map((course: Course): string[] => [
                            "{",
                            "courseID",
                            ":",
                            course.courseID.toString(),
                            "listing",
                            ":",
                            course.listing,
                            "title",
                            ":",
                            course.title,
                            "preReqs",
                            ":",
                            course.preReqs
                                .map((preReq: number) => preReq.toString())
                                .join(","),
                            "coReqs",
                            ":",
                            course.coReqs
                                .map((coReq: number) => coReq.toString())
                                .join(","),
                            "offered",
                            ":",
                            course.offered.join(","),
                            "credits",
                            ":",
                            course.credits.toString(),
                            "reqsSatisfied",
                            ":",
                            course.reqsSatisfied.join(",")
                        ])
                        .join(","),
                    "errors",
                    ":",
                    semester.errors.join(",")
                ])
                .join("\r\n")
        ].join("\r\n"); // New row for each degree plan
        return exportCSV;
    }

    function downloadBlob() {
        // Create a blob
        const blob = new Blob([planToCSV()], {
            type: "text/csv;charset=utf-8;"
        });
        const url = URL.createObjectURL(blob);

        // Create a link to download it
        const pom = document.createElement("a");
        pom.href = url;
        pom.setAttribute("download", "degreePlan" + degree.degreeID.toString());
        pom.click();
    }

    return (
        <div hidden={hidden}>
            <br></br>
            <Row>
                <div>
                    <Button
                        onClick={() => downloadBlob()}
                        variant={"outline-primary"}
                    >
                        Download Degree Plan
                    </Button>
                </div>
            </Row>
            <br></br>
            <Button
                onClick={() => setEditMode(!editMode)}
                variant={editMode ? "warning" : "success"}
            >
                {editMode ? "Stop Edit" : "Edit Plan"}
            </Button>
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
                                    updateEditCount={update}
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
                                    updateEditCount={update}
                                ></SemesterViewHome>
                                <br></br>
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
            <Row>
                <div>
                    <h2>
                        {degree.name} Total Credits: {credits}
                    </h2>
                </div>
            </Row>
            <Row>
                <Col>
                    <CheckRequirements degree={degree}></CheckRequirements>
                </Col>
                <Col>
                    <ShowAllErrors degree={degree}></ShowAllErrors>
                </Col>
            </Row>
            <Row>
                <AddSemester
                    degree={degree}
                    editDegree={editDegree}
                    editMode={editMode}
                ></AddSemester>
            </Row>
        </div>
    );
}
