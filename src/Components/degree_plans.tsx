import React from "react";
import { Degree } from "../Interfaces/degree";
import { Stack } from "react-bootstrap";

export function DegreePlans({ degrees }: { degrees: Degree[] }): JSX.Element {
    return (
        <Stack gap={2}>
            <div>To be modified</div>
            {degrees.map((degree: Degree) => (
                <div key={degree.degreeID}>
                    {degree.degreeID}:{degree.name}
                </div>
            ))}
        </Stack>
    );
}
