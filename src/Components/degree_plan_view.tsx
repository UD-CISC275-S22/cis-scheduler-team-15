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
        /*
        const headers = [
            { label: "DegreeID", key: "degreeID" },
            { label: "Name", key: "name" },
            { label: "SemesterID", key: "semesterID" },
            { label: "Season", key: "season" },
            { label: "Year", key: "year" },
            { label: "Semester", key: "semesterID" },
            { label: "CourseID", key: "courseID" },
            { label: "Course Listing", key: "listing" },
            { label: "Course Title", key: "title" },
            { label: "PreReqs", key: "preReqs" },
            { label: "CoReqs", key: "coReqs" },
            { label: "Seasons Offered", key: "offered" },
            { label: "Credits", key: "credits" },
            { label: "Errors", key: "errors" }
        ];
        
        const heading = [
            "DegreeID",
            "Name",
            "SemesterID",
            "Season",
            "Year",
            "Semester",
            "CourseID",
            "Course Listing",
            "Course Title",
            "PreReqs",
            "CoReqs",
            "Seasons Offered",
            "Credits",
            "Errors"
        ].join(",");*/
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
            <br></br>
            <Button onClick={downloadBlob}>Export Degree Plan</Button>
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
