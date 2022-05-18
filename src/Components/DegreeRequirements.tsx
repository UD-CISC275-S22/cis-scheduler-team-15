import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { DegreeRequirementView } from "./DegreeRequirementView";
import "../App.css";

// Show and hide functionality to show a list of the degree requirements based on concentration

export function DegreeRequirements({
    concentration
}: {
    concentration: string;
}): JSX.Element {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <div>
            <div>
                <Button onClick={() => setVisible(!visible)}>
                    {visible ? "Hide" : "Show"}
                </Button>
                {visible && (
                    <DegreeRequirementView
                        concentration={concentration}
                    ></DegreeRequirementView>
                )}
            </div>
        </div>
    );
}
