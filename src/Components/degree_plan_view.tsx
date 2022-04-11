import React, { useState } from "react";
import { Degree } from "../Interfaces/degree";
import { Semester } from "../Interfaces/semester";
import "../App.css";
import { Row, Col, Button } from "react-bootstrap";
import { SemesterView } from "./SemesterView";
import { AddSemester } from "./add_semester";

export function DegreePlanView({
    degree,
    editDegree,
    removeDegree,
    hidden
}: {
    degree: Degree;
    editDegree: (degreeID: number, newDegree: Degree) => void;
    removeDegree: (degreeID: number) => void;
    hidden: boolean;
}): JSX.Element {
    const [editMode, setEditMode] = useState<boolean>(false);
    const springSummer = degree.semesters.filter(
        (semester: Semester): boolean =>
            semester.season === "Spring" || semester.season === "Summer"
    );
    const FallWinter = degree.semesters.filter(
        (semester: Semester): boolean =>
            semester.season === "Fall" || semester.season === "Winter"
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
            <Button onClick={() => setEditMode(!editMode)}>
                Edit Degree Plan
            </Button>
            <br></br>
            <Button
                hidden={!editMode}
                onClick={() => removeDegree(degree.degreeID)}
            >
                Delete Degree Plan
            </Button>
            <Row>
                <Col>
                    <div className="App-tables">
                        {FallWinter.map((semester: Semester) => (
                            <div key={semester.semesterID}>
                                <SemesterView
                                    semester={semester}
                                    editMode={editMode}
                                    deleteSemester={deleteSemester}
                                ></SemesterView>
                                <br></br>
                            </div>
                        ))}
                    </div>
                </Col>
                <Col>
                    <div className="App-tables">
                        {springSummer.map((semester: Semester) => (
                            <div key={semester.semesterID}>
                                <SemesterView
                                    semester={semester}
                                    editMode={editMode}
                                    deleteSemester={deleteSemester}
                                ></SemesterView>
                                <br></br>
                            </div>
                        ))}
                    </div>
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
