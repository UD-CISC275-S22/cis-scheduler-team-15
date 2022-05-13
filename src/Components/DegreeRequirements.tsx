import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { DegreeRequirementView } from "./DegreeRequirementView";
import "../App.css";

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
