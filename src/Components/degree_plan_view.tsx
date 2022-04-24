import React, { useState } from "react";
import { Degree } from "../Interfaces/degree";
import { Semester } from "../Interfaces/semester";
import "../App.css";
import { Row, Col, Button } from "react-bootstrap";
import { SemesterViewHome } from "./SemesterViewHome";
import { AddSemester } from "./add_semester";
//import { CheckRequirements } from "./check_requirements";
import { Course } from "../Interfaces/course";

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

    return (
        <div hidden={hidden}>
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
            {/* <Row>
                <CheckRequirements degree={degree}></CheckRequirements>
            </Row> */}
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
