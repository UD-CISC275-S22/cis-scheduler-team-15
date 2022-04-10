import React from "react";
import { Degree } from "../Interfaces/degree";
import { Semester } from "../Interfaces/semester";
import "../App.css";
import { Row, Col } from "react-bootstrap";
import { SemesterView } from "./SemesterView";

export function DegreePlanView({
    degree,
    hidden
}: {
    degree: Degree;
    hidden: boolean;
}): JSX.Element {
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
            <Row>
                <Col>
                    <div className="App-tables">
                        {FallWinter.map((semester: Semester) => (
                            <SemesterView
                                semester={semester}
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
                                key={semester.semesterID}
                            ></SemesterView>
                        ))}
                    </div>
                </Col>
            </Row>
        </div>
    );
}
