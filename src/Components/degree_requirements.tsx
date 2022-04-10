import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { DegreeRequirementView } from "./degree_requirement_view";
import "../App.css";

export function DegreeRequirements(): JSX.Element {
    const [visible, setVisible] = useState<boolean>(true);

    return (
        <div>
            <div>
                <Button onClick={() => setVisible(!visible)}>
                    {visible ? "Hide" : "Show"}
                </Button>
                {visible && <DegreeRequirementView></DegreeRequirementView>}
            </div>
        </div>
    );
}
