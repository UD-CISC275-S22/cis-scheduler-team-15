import React from "react";
import { Course } from "../Interfaces/course";
import { Semester } from "../Interfaces/semester";
import { Button } from "react-bootstrap";
import "../App.css";
import { MoveCourse } from "./move_course";
import { Degree } from "../Interfaces/degree";

export function SemesterViewModal({
    semester,
    degree,
    editDegree,
    deleteCourse
}: {
    semester: Semester;
    degree: Degree;
    editDegree: (degreeID: number, newDegree: Degree) => void;
    deleteCourse: (index: number, semster: Semester) => void;
}): JSX.Element {
    return (
        <div>
            <table key={semester.semesterID}>
                <tr>
                    <td width={80}>
                        <b>Course ID</b>
                    </td>
                    <td width={275}>
                        <b>Course Name</b>
                    </td>
                    <td width={50}>
                        <b>Credits</b>
                    </td>
                </tr>
                {semester.courses.map((course: Course, index) => (
                    <tr key={course.courseID}>
                        <td>{course.listing}</td>
                        <td>{course.title}</td>
                        <td>{course.credits}</td>
                        <td width={25}>
                            <Button
                                className="btn btn-secondary btn-circle btn-sm"
                                data-bs-toggle="modal"
                                data-toggle="tooltip"
                                title={"Click to delete " + course.listing}
                                variant="danger"
                                onClick={() => deleteCourse(index, semester)}
                            >
                                🗑️
                            </Button>
                        </td>
                        <td width={125}>
                            <MoveCourse
                                semester={semester}
                                degree={degree}
                                editDegree={editDegree}
                                course={course}
                            ></MoveCourse>
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
