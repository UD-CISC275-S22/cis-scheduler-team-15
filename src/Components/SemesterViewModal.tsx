import React from "react";
import { Course } from "../Interfaces/course";
import { Semester } from "../Interfaces/semester";
import { Button } from "react-bootstrap";
import "../App.css";

export function SemesterViewModal({
    semester,
    deleteCourse
}: {
    semester: Semester;
    deleteCourse: (course: Course, semster: Semester) => void;
}): JSX.Element {
    return (
        <div>
            <table key={semester.semesterID}>
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
                        <td>
                            <Button
                                className="btn btn-secondary btn-circle btn-sm"
                                data-bs-toggle="modal"
                                data-toggle="tooltip"
                                title={"Click to delete " + course.listing}
                                variant="danger"
                                onClick={() => deleteCourse(course, semester)}
                            >
                                x
                            </Button>
                        </td>
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
        </div>
    );
}
