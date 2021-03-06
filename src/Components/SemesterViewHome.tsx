import React from "react";
import { Course } from "../Interfaces/Course";
import { Semester } from "../Interfaces/Semester";
import { Degree } from "../Interfaces/Degree";
import "../App.css";
import { Button } from "react-bootstrap";
import { EditSemester } from "./EditSemester";
import { CheckSemesters } from "./CheckSemesters";

/* Table view of each semester used in the displayed degree plan */

export function SemesterViewHome({
    semester,
    editMode,
    deleteSemester,
    degree,
    editDegree,
    courses,
    insertCourse
}: {
    semester: Semester;
    editMode: boolean;
    deleteSemester: (semesterID: number) => void;
    degree: Degree;
    editDegree: (degreeID: number, newDegree: Degree) => void;
    courses: Course[];
    insertCourse: (newCourse: Course) => void;
}): JSX.Element {
    return (
        <div>
            <table key={semester.semesterID}>
                <thead>
                    <tr>
                        <th>
                            <b>
                                {semester.season} {semester.year}
                            </b>
                        </th>
                        <th className="Align-right">
                            <EditSemester
                                semester={semester}
                                editMode={editMode}
                                degree={degree}
                                editDegree={editDegree}
                                courses={courses}
                                checkSemester={() =>
                                    CheckSemesters({
                                        courses,
                                        degree,
                                        editDegree
                                    })
                                }
                                insertCourse={insertCourse}
                            ></EditSemester>
                        </th>
                        <th className="Align-right">
                            <Button
                                hidden={!editMode}
                                variant="danger"
                                onClick={() =>
                                    deleteSemester(semester.semesterID)
                                }
                                title={
                                    "Click to delete " +
                                    semester.season +
                                    " " +
                                    semester.year
                                }
                            >
                                ???????
                            </Button>
                        </th>
                    </tr>
                </thead>
                <tbody>
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
                </tbody>
            </table>
        </div>
    );
}
