import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
//import { Degree } from "../Interfaces/degree";
//import { Semester } from "../Interfaces/semester";
//import { Degree } from "../Interfaces/degree";
//import { Semester } from "../Interfaces/semester";
//import { Course } from "../Interfaces/course";
//import { SemesterViewModal } from "./SemesterViewModal";

export function AddCourse(): JSX.Element {
    const [coursePromptVisible, setCoursePromptVisible] =
        useState<boolean>(false);
    const [listing, setListing] = useState<string>("");
    function updateListing(event: React.ChangeEvent<HTMLInputElement>) {
        setListing(event.target.value);
    }
    return (
        <div>
            <Button
                onClick={() => setCoursePromptVisible(!coursePromptVisible)}
            >
                {coursePromptVisible ? "Hide" : "Add Course"}
            </Button>
            <div>
                {coursePromptVisible && (
                    <Form.Group controlId="formMovieName">
                        <Form.Label>Course Listing:</Form.Label>
                        <Form.Control
                            value={listing}
                            onChange={updateListing}
                        />
                    </Form.Group>
                )}
            </div>
        </div>
    );
}
