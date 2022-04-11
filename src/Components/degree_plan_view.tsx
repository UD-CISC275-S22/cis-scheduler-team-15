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
    hidden
}: {
    degree: Degree;
    editDegree: (degreeID: number, newDegree: Degree) => void;
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
    return (
        <div hidden={hidden}>
            <br></br>
            <Button onClick={() => setEditMode(!editMode)}>
                Edit Degree Plan
            </Button>
            <Row>
                <Col>
                    <div className="App-tables">
                        {FallWinter.map((semester: Semester) => (
                            <SemesterView
                                semester={semester}
                                editMode={editMode}
                                key={semester.semesterID}
                            ></SemesterView>
                        ))}
                    </div>
                </Col>
                <Col>
                    <div className="App-tables">
                        {springSummer.map((semester: Semester) => (
                            <SemesterView
                                semester={semester}
                                editMode={editMode}
                                key={semester.semesterID}
                            ></SemesterView>
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
