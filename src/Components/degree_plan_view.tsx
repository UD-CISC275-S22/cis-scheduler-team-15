import React from "react";
import { Course } from "../Interfaces/course";
import { Degree } from "../Interfaces/degree";
import { Semester } from "../Interfaces/semester";
import "../App.css";
import { Row, Col } from "react-bootstrap";

export function DegreePlanView({
    degree,
    hidden
}: {
    degree: Degree;
    hidden: boolean;
}): JSX.Element {
    const springSummer = degree.semesters.filter(
        (semester: Semester): boolean =>
            semester.season === "Spring" || semester.season === "Summer"
    );
    const FallWinter = degree.semesters.filter(
        (semester: Semester): boolean =>
            semester.season === "Fall" || semester.season === "Winter"
    );
    return (
        <div hidden={hidden}>
            <Row>
                <Col>
                    <div className="App-tables">
                        {FallWinter.map((semester: Semester) => (
                            <table key={semester.semesterID}>
                                <tr>
                                    <th colSpan={3}>
                                        <b>
                                            {semester.season} {semester.year}
                                        </b>
                                    </th>
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
                                                .map(
                                                    (course: Course) =>
                                                        course.credits
                                                )
                                                .reduce(
                                                    (
                                                        currTotal: number,
                                                        num: number
                                                    ) => currTotal + num,
                                                    0
                                                )}
                                        </b>
                                    </td>
                                </tr>
                            </table>
                        ))}
                    </div>
                </Col>
                <Col>
                    <div>
                        {springSummer.map((semester: Semester) => (
                            <table key={semester.semesterID}>
                                <tr>
                                    <th colSpan={3}>
                                        <b>
                                            {semester.season} {semester.year}
                                        </b>
                                    </th>
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
                                                .map(
                                                    (course: Course) =>
                                                        course.credits
                                                )
                                                .reduce(
                                                    (
                                                        currTotal: number,
                                                        num: number
                                                    ) => currTotal + num,
                                                    0
                                                )}
                                        </b>
                                    </td>
                                </tr>
                            </table>
                        ))}
                    </div>
                </Col>
            </Row>
        </div>
    );
}
