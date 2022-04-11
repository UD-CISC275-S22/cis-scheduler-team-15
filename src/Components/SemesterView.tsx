import React from "react";
import { Course } from "../Interfaces/course";
import { Semester } from "../Interfaces/semester";
import "../App.css";
import { Button } from "react-bootstrap";

export function SemesterView({
    semester,
    editMode,
    deleteSemester
}: {
    semester: Semester;
    editMode: boolean;
    deleteSemester: (semesterID: number) => void;
}): JSX.Element {
    return (
        <table key={semester.semesterID}>
            <tr>
                <th>
                    <b>
                        {semester.season} {semester.year}
                    </b>
                </th>
                <th className="Align-right">
                    <Button hidden={!editMode}>Edit</Button>
                </th>
                <th>
                    <Button
                        hidden={!editMode}
                        onClick={() => deleteSemester(semester.semesterID)}
                    >
                        Delete
                    </Button>
                </th>
            </tr>
            <tr>
                <td width={125}>
                    <b>Course ID</b>
                </td>
                <td width={350}>
                    <b>Course Name</b>
                </td>
                <td width={75}>
                    <b>Credits</b>
                </td>
            </tr>
            {semester.courses.map((course: Course) => (
                <tr key={course.courseID}>
                    <td>{course.listing}</td>
                    <td>{course.title}</td>
                    <td>{course.credits}</td>
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
