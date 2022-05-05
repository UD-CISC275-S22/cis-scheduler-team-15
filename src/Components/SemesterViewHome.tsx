import React from "react";
import { Course } from "../Interfaces/course";
import { Semester } from "../Interfaces/semester";
import { Degree } from "../Interfaces/degree";
import "../App.css";
import { Button } from "react-bootstrap";
import { EditSemester } from "./edit_semester";
import { CheckSemesters } from "./check_semesters";

export function SemesterViewHome({
    semester,
    editMode,
    deleteSemester,
    degree,
    editDegree,
    courses,
    updateEditCount
}: {
    semester: Semester;
    editMode: boolean;
    deleteSemester: (semesterID: number) => void;
    degree: Degree;
    editDegree: (degreeID: number, newDegree: Degree) => void;
    courses: Course[];
    updateEditCount: () => void;
}): JSX.Element {
    return (
        <div>
            <table key={semester.semesterID}>
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
                            updateEditCount={updateEditCount}
                        ></EditSemester>
                    </th>
                    <th>
                        <Button
                            hidden={!editMode}
                            variant="danger"
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

                {/*
                {courses
                    .filter(
                        (course: Course) =>
                            semester.courses.includes(course) === true
                    )
                    .map((course: Course) => (
                        <tr key={course.courseID}>
                            <td>{course.listing}</td>
                            <td>{course.title}</td>
                            <td>{course.credits}</td>
                        </tr>
                    ))}
                    */}
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
