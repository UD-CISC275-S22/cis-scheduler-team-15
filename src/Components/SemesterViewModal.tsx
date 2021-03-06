import React, { useState } from "react";
import { Course } from "../Interfaces/Course";
import { Semester } from "../Interfaces/Semester";
import { Button, Accordion } from "react-bootstrap";
import "../App.css";
import { MoveCourse } from "./MoveCourse";
import { Degree } from "../Interfaces/Degree";

/*The table shown of a semester's courses in the EditSemester modal
Inclues the buttons for deleting and moving individual courses.
Includes a customized accordion component in each row of the table
to provide more details for each course*/
export function SemesterViewModal({
    semester,
    degree,
    courses,
    editDegree,
    deleteCourse
}: {
    semester: Semester;
    degree: Degree;
    courses: Course[];
    editDegree: (degreeID: number, newDegree: Degree) => void;
    deleteCourse: (index: number, semster: Semester) => void;
}): JSX.Element {
    const [hovering, setHovering] = useState<boolean[]>(
        Array(semester.courses.length).fill(false)
    );

    return (
        <div>
            <table className="center" key={semester.semesterID}>
                <thead>
                    <tr>
                        <td width={80}>
                            <b>Course ID</b>
                        </td>
                        <td width={350}>
                            <b>Course Name</b>
                        </td>
                        <td width={50}>
                            <b>Credits</b>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {semester.courses.map((course: Course, index) => (
                        <tr key={course.courseID}>
                            <td>{course.listing}</td>
                            <td>
                                <Accordion className="accordion-modal">
                                    <Accordion.Header
                                        onMouseOver={() =>
                                            setHovering(
                                                hovering.map(
                                                    (
                                                        hover: boolean,
                                                        hoverIndex
                                                    ) =>
                                                        hoverIndex === index
                                                            ? true
                                                            : hover
                                                )
                                            )
                                        }
                                        onMouseLeave={() =>
                                            setHovering(
                                                hovering.map(
                                                    (
                                                        hover: boolean,
                                                        hoverIndex
                                                    ) =>
                                                        hoverIndex === index
                                                            ? false
                                                            : hover
                                                )
                                            )
                                        }
                                    >
                                        {hovering[index] ? (
                                            <i>
                                                <b>{course.title}</b>
                                            </i>
                                        ) : (
                                            <span>{course.title}</span>
                                        )}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                            Semesters offered:{" "}
                                            {course.offered.join(", ")}
                                        </div>
                                        {course.preReqs.length !== 0 && (
                                            <div>
                                                Prereq(s):{" "}
                                                {
                                                    <span>
                                                        {course.preReqs
                                                            .map(
                                                                (
                                                                    courseID: number
                                                                ) =>
                                                                    courses.filter(
                                                                        (
                                                                            course: Course
                                                                        ): boolean =>
                                                                            course.courseID ===
                                                                            courseID
                                                                    )[0].listing
                                                            )
                                                            .join(", ")}
                                                    </span>
                                                }
                                            </div>
                                        )}
                                        {course.coReqs.length !== 0 && (
                                            <div>
                                                Coreqs(s):{" "}
                                                <span>
                                                    {course.coReqs
                                                        .map(
                                                            (
                                                                courseID: number
                                                            ) =>
                                                                courses.filter(
                                                                    (
                                                                        course: Course
                                                                    ): boolean =>
                                                                        course.courseID ===
                                                                        courseID
                                                                )[0].listing
                                                        )
                                                        .join(", ")}
                                                </span>
                                            </div>
                                        )}
                                        {course.reqsSatisfied.length !== 0 && (
                                            <div>
                                                Requirement(s) satisfied:{" "}
                                                <span>
                                                    {course.reqsSatisfied.join(
                                                        ", "
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                    </Accordion.Body>
                                </Accordion>
                            </td>
                            <td>{course.credits}</td>
                            <td width={40} style={{ textAlign: "center" }}>
                                <Button
                                    data-bs-toggle="modal"
                                    data-toggle="tooltip"
                                    title={"Click to delete " + course.listing}
                                    variant="danger"
                                    onClick={() =>
                                        deleteCourse(index, semester)
                                    }
                                    className="trash_button"
                                    data-testid="delete-course-button"
                                >
                                    ???????
                                </Button>
                            </td>
                            <td
                                width={180}
                                hidden={degree.semesters.length === 1}
                            >
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
                </tbody>
            </table>
        </div>
    );
}
