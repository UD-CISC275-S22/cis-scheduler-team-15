import React from "react";
import "../App.css";
import { Semester } from "../Interfaces/Semester";
import { Course } from "../Interfaces/Course";

/*Shows the errors for a semester, makes sure that nothing displays
if the semester has no errors*/
export function ShowSemesterErrors({
    semester
}: {
    semester: Semester;
}): JSX.Element {
    const errorHeader = !semester.errors.every((error: string) => error === "")
        ? "Errors: "
        : "";
    const errors = semester.courses
        .filter(
            (course: Course, index: number) => semester.errors[index] !== ""
        )
        .map(
            (course: Course, index: number): string =>
                course.listing +
                ": " +
                semester.errors.filter((error: string) => error !== "")[index]
        );

    return (
        <div>
            <br></br>
            <b style={{ color: "red" }}>{errorHeader}</b>
            <div data-testid="semester-error-test">
                {errors.map((error: string, index: number) => (
                    <p key={index}>
                        <span style={{ color: "red" }}>{error}</span>
                    </p>
                ))}
            </div>
        </div>
    );
}
