import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "../App.css";
import { Degree } from "../Interfaces/Degree";
import { Semester } from "../Interfaces/Semester";
import { Course } from "../Interfaces/Course";

/*Shows the errors for every semester in the degree plan by
combining the error field of every semester*/
export function ShowAllErrors({ degree }: { degree: Degree }): JSX.Element {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <div>
            <Button
                onClick={() => setVisible(!visible)}
                variant={visible ? "warning" : "primary"}
                style={{ margin: "5px" }}
            >
                {!visible ? "⚠ Show Errors ⚠" : "🛑 Hide Errors 🛑"}
            </Button>
            {visible && (
                <div>
                    {degree.semesters.map((semester: Semester) =>
                        semester.courses
                            .filter(
                                (course: Course, index: number) =>
                                    semester.errors[index] !== ""
                            )
                            .map((course: Course, index: number) => (
                                <p key={index} className="line-break">
                                    <span
                                        data-testid={
                                            course.listing + " error-all errors"
                                        }
                                        style={{ color: "red" }}
                                    >
                                        {course.listing} {"\r"} (
                                        {semester.season}{" "}
                                        {semester.year.toString()}):{" "}
                                        {
                                            semester.errors.filter(
                                                (error: string) => error !== ""
                                            )[index]
                                        }
                                    </span>
                                </p>
                            ))
                    )}
                </div>
            )}
        </div>
    );
}
