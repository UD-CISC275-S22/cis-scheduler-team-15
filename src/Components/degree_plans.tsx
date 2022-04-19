import React, { useState } from "react";
import { Degree } from "../Interfaces/degree";
import { Stack, ToggleButton, Col, Row, Button } from "react-bootstrap";
import PlanData from "./../Data/plan_data.json";
import { DegreePlanView } from "./degree_plan_view";
import { Course } from "../Interfaces/course";
import { Semester } from "../Interfaces/semester";

const DEGREEPLANSTART = PlanData.map((degree): Degree => ({ ...degree }));

export function DegreePlans({ courses }: { courses: Course[] }): JSX.Element {
    const [degreePlans, setDegreePlans] = useState<Degree[]>(DEGREEPLANSTART);
    const [currentDegreePlanID, setCurrentDegreePlanID] = useState<number>(0);

    function addEmptyDegreePlan(): void {
        const IDList = degreePlans.map((degree: Degree) => degree.degreeID);
        const newID = degreePlans.length > 0 ? Math.max(...IDList) + 1 : 1;
        const newName = "Degree plan " + newID;
        const newDegreePlan: Degree = {
            name: newName,
            degreeID: newID,
            semesters: []
        };
        setDegreePlans([...degreePlans, newDegreePlan]);
    }

    function addStartDegreePlan(): void {
        const IDList = degreePlans.map((degree: Degree) => degree.degreeID);
        setDegreePlans([
            ...degreePlans,
            {
                ...DEGREEPLANSTART[0],
                degreeID: degreePlans.length > 0 ? Math.max(...IDList) + 1 : 1
            }
        ]);
    }

    function removeDegreePlan(degreeID: number): void {
        setDegreePlans(
            degreePlans.filter((degree: Degree) => degree.degreeID !== degreeID)
        );
    }

    function selectDegreePlan(degree: Degree): void {
        setCurrentDegreePlanID(
            degree.degreeID === currentDegreePlanID ? 0 : degree.degreeID
        );
    }

    function sortSemesters(degree: Degree): Degree {
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
        newDegreePlan = sortSemesters(newDegreePlan);
        setDegreePlans(
            degreePlans.map(
                (degree: Degree): Degree =>
                    degree.degreeID === degreeID ? newDegreePlan : degree
            )
        );
    }

    return (
        <Stack gap={2}>
            <Row>
                <Col>
                    <Button onClick={addEmptyDegreePlan}>Add Empty plan</Button>
                </Col>
                <Col xs={3}>
                    <Button onClick={addStartDegreePlan}>
                        Add Default Plan (8 semesters)
                    </Button>
                </Col>
                <Col>
                    <Button
                        onClick={() => removeDegreePlan(currentDegreePlanID)}
                        variant={
                            currentDegreePlanID === 0
                                ? "outline-danger"
                                : "danger"
                        }
                    >
                        Delete selected plan
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="App">
                        {degreePlans.map((degree: Degree) => (
                            <span
                                key={degree.degreeID}
                                style={{ margin: "5px" }}
                            >
                                <ToggleButton
                                    value={degree.degreeID}
                                    key={degree.degreeID}
                                    variant={
                                        degree.degreeID === currentDegreePlanID
                                            ? "primary"
                                            : "outline-primary"
                                    }
                                    checked={
                                        degree.degreeID === currentDegreePlanID
                                    }
                                    onClick={() => selectDegreePlan(degree)}
                                >
                                    {degree.degreeID}: {degree.name}
                                </ToggleButton>
                            </span>
                        ))}
                        {degreePlans.map((degree: Degree) => (
                            <span key={degree.degreeID}>
                                <DegreePlanView
                                    courses={courses}
                                    degree={degree}
                                    editDegree={editDegreePlan}
                                    hidden={
                                        degree.degreeID !== currentDegreePlanID
                                    }
                                ></DegreePlanView>
                            </span>
                        ))}
                    </div>
                </Col>
            </Row>
        </Stack>
    );
}
