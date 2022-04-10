import React from "react";
import { Course } from "../Interfaces/course";
import { Semester } from "../Interfaces/semester";
import "../App.css";
import { Button } from "react-bootstrap";

export function SemesterView({
    semester
}: {
    semester: Semester;
}): JSX.Element {
    return (
        <table key={semester.semesterID}>
            <tr>
                <th colSpan={2}>
                    <b>
                        {semester.season} {semester.year}
                    </b>
                </th>
                <Button>Edit</Button>
            </tr>
            <tr>
                <td>
                    <b>Course ID</b>
                </td>
                <td>
                    <b>Course Name</b>
                </td>
                <td>
                    <b>Credits</b>
                </td>
            </tr>
            {semester.courses.map((course: Course) => (
                <tr key={course.courseID}>
                    <td width={100}>{course.listing}</td>
                    <td width={350}>{course.title}</td>
                    <td width={75}>{course.credits}</td>
                </tr>
            ))}
            <tr>
                <td colSpan={2}>
                    <b>Total Credits</b>
                </td>
                <td>
                    <b>
                        {semester.courses
                            .map((course: Course) => course.credits)
                            .reduce(
                                (currTotal: number, num: number) =>
                                    currTotal + num,
                                0
                            )}
                    </b>
                </td>
            </tr>
        </table>
    );
}
