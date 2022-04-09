import React, { useState } from "react";
import { Degree } from "../Interfaces/degree";
import { Stack, ToggleButton } from "react-bootstrap";
import PlanData from "./../Data/plan_data.json";

export function DegreePlans(): JSX.Element {
    const DEGREEPLANS = PlanData.map((degree): Degree => ({ ...degree }));
    const [degreePlans] = useState<Degree[]>(DEGREEPLANS);

    return (
        <Stack gap={2}>
            <div>To be modified</div>
            <div>
                {degreePlans.map((degree: Degree) => (
                    <ToggleButton value={degree.degreeID} key={degree.degreeID}>
                        {degree.degreeID}: {degree.name}
                    </ToggleButton>
                ))}
            </div>
        </Stack>
    );
}
