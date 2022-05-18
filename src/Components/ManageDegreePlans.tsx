import React, { useState } from "react";
import { Degree } from "../Interfaces/Degree";
import { Col, Row, Button } from "react-bootstrap";
import { Course } from "../Interfaces/Course";
import { Semester } from "../Interfaces/Semester";
import { DegreePlanView } from "./DegreePlanView";

/* Second part of the DegreePlans file, this contains the code for actually displaying
all of the degree plan info */

export function ManageDegreePlans({
    degreePlans,
    updateDegreePlans,
    courses,
    concentration,
    insertCourse
}: {
    degreePlans: Degree[];
    updateDegreePlans: (degreePlans: Degree[]) => void;
    courses: Course[];
    concentration: string;
    insertCourse: (newCourse: Course) => void;
}): JSX.Element {
    const [currentDegreePlanID, setCurrentDegreePlanID] = useState<number>(0);

    function removeDegreePlan(degreeID: number): void {
        // Removes a degree plan based on a target ID
        updateDegreePlans(
            degreePlans.filter((degree: Degree) => degree.degreeID !== degreeID)
        );
    }

    function selectDegreePlan(degree: Degree): void {
        // Updates the current degree plan being displayed
        setCurrentDegreePlanID(
            degree.degreeID === currentDegreePlanID ? 0 : degree.degreeID
        );
    }

    function sortSemesters(degree: Degree): Degree {
        // Makes sure the semesters display in chronological order when a semester is added to the plan
        let newSemesters = [...degree.semesters];
        newSemesters = newSemesters.sort(
            (a: Semester, b: Semester): number =>
                a.year -
                b.year +
                (["Winter", "Spring", "Summer", "Fall"].indexOf(a.season) / 4 -
                    ["Winter", "Spring", "Summer", "Fall"].indexOf(b.season) /
                        4)
        );
        return (
            degree.degreeID,
            {
                ...degree,
                semesters: newSemesters
            }
        );
    }

    function editDegreePlan(degreeID: number, newDegreePlan: Degree) {
        // Modify a plan by replacing the old plan with the new one (identified using degree ID)
        newDegreePlan = sortSemesters(newDegreePlan);
        newDegreePlan.semesters.map((semester: Semester) =>
            semester.courses.sort((course1, course2) =>
                course1.listing < course2.listing ? -1 : 1
            )
        );
        updateDegreePlans(
            degreePlans.map(
                (degree: Degree): Degree =>
                    degree.degreeID === degreeID ? newDegreePlan : degree
            )
        );
    }

    return (
        <Row>
            <div className="tab">
                <Col>
                    <div>
                        {degreePlans.map((degree: Degree) => (
                            <Button
                                key={degree.degreeID}
                                value={degree.degreeID}
                                style={{ margin: "0px 5px" }}
                                className="tablinks"
                                onClick={() => selectDegreePlan(degree)}
                                active={degree.degreeID === currentDegreePlanID}
                            >
                                {degree.name}
                            </Button>
                        ))}
                        <span hidden={currentDegreePlanID !== 0}>
                            <b>🠘 Select a Degree Plan to View/Edit</b>
                        </span>
                    </div>
                </Col>
            </div>

            <div>
                {degreePlans.map((degree: Degree) => (
                    <span key={degree.degreeID}>
                        <Row>
                            <Col>
                                <div
                                    hidden={
                                        degree.degreeID !== currentDegreePlanID
                                    }
                                    className="Align-left2"
                                >
                                    <h3>Total Credits</h3>
                                </div>
                            </Col>
                            <Col>
                                <div
                                    hidden={
                                        degree.degreeID !== currentDegreePlanID
                                    }
                                    className="App-special3-right"
                                >
                                    <Button
                                        onClick={() =>
                                            removeDegreePlan(
                                                currentDegreePlanID
                                            )
                                        }
                                        variant="danger"
                                        style={{ margin: "5px" }}
                                    >
                                        Delete Plan 🗑️
                                    </Button>
                                </div>
                            </Col>
                        </Row>

                        <div className="App-special3">
                            <DegreePlanView
                                courses={courses}
                                degree={degree}
                                editDegree={editDegreePlan}
                                hidden={degree.degreeID !== currentDegreePlanID}
                                concentration={concentration}
                                insertCourse={insertCourse}
                            ></DegreePlanView>
                        </div>
                    </span>
                ))}
            </div>
        </Row>
    );
}
