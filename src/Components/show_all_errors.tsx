import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "../App.css";
import { Degree } from "../Interfaces/degree";
import { Semester } from "../Interfaces/semester";
import { Course } from "../Interfaces/course";

export function ShowAllErrors({ degree }: { degree: Degree }): JSX.Element {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <div>
            <Button onClick={() => setVisible(!visible)}>
                {!visible ? "Show All Errors" : "Stop Showing"}
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
                                    <span>
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
