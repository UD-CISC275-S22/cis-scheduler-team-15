import React, { useState } from "react";
import { Degree } from "../Interfaces/degree";
import { Stack, ToggleButton, Col, Row, Button } from "react-bootstrap";
import PlanData from "./../Data/plan_data.json";
const DEGREEPLANS = PlanData.map((degree): Degree => ({ ...degree }));

export function DegreePlans(): JSX.Element {
    const [degreePlans, setDegreePlans] = useState<Degree[]>(DEGREEPLANS);
    const [currentDegreePlanID, setCurrentDegreePlanID] = useState<number>(0);

    function addDegreePlan(): void {
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

    return (
        <Stack gap={2}>
            <div>To be modified</div>
            <Row>
                <Col>
                    <div>
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
                    </div>
                </Col>
                <Col>
                    <div>
                        <Button onClick={addDegreePlan}>Add new plan</Button>
                    </div>
                    <br></br>
                    <div>
                        <Button
                            onClick={() =>
                                removeDegreePlan(currentDegreePlanID)
                            }
                        >
                            Delete selected plan
                        </Button>
                    </div>
                </Col>
            </Row>
        </Stack>
    );
}
