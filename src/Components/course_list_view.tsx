import * as React from "react";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Course } from "../Interfaces/course";

export function CourseListView({ course }: { course: Course }): JSX.Element {
    const [editing, setEditing] = useState<boolean>(false); // Will need to be revised

    if (editing) {
        return (
            <Container>
                <div>
                    Add edit Format
                    <div>
                        <Button onClick={() => setEditing(false)}>
                            Update Course
                        </Button>
                    </div>
                </div>
            </Container>
        );
    } else {
        return (
            <Container>
                <div>
                    <div>
                        {course.listing}: {course.title}
                    </div>
                    <div>
                        <Button onClick={() => setEditing(true)}>Edit</Button>
                    </div>
                </div>
            </Container>
        );
    }
}