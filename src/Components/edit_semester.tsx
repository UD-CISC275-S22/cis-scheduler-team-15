import React, { useEffect, useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { Degree } from "../Interfaces/degree";
import { Semester } from "../Interfaces/semester";
import { Course } from "../Interfaces/course";
import { SemesterViewModal } from "./SemesterViewModal";
import { AddCourse } from "./add_course";

export function EditSemester({
    semester,
    editMode,
    degree,
    editDegree,
    courses,
    checkSemester
}: {
    semester: Semester;
    editMode: boolean;
    degree: Degree;
    editDegree: (degreeID: number, newDegree: Degree) => void;
    courses: Course[];
    checkSemester: (
        courses: Course[],
        degree: Degree,
        editDegree: (degreeID: number, newDegree: Degree) => void
    ) => void;
}): JSX.Element {
    const [modal, setModal] = useState<boolean>(false);
    function replaceSemesterInDegree(newSemester: Semester) {
        const newSemesters: Semester[] = [
            ...degree.semesters.filter(
                (existingSemester: Semester): boolean =>
                    semester.semesterID !== existingSemester.semesterID
            ),
            newSemester
        ];
        const newDegree: Degree = { ...degree, semesters: newSemesters };
        editDegree(degree.degreeID, newDegree);
    }

    function deleteAll(semester: Semester) {
        const newSemester: Semester = {
            semesterID: semester.semesterID,
            season: semester.season,
            year: semester.year,
            courses: [],
            errors: []
        };
        replaceSemesterInDegree(newSemester);
    }

    function deleteCourse(index: number, semester: Semester) {
        const newCourses = [
            ...semester.courses.slice(0, index),
            ...semester.courses.slice(index + 1)
        ];
        const newSemester: Semester = {
            semesterID: semester.semesterID,
            season: semester.season,
            year: semester.year,
            courses: newCourses,
            errors: Array(newCourses.length).fill("")
        };
        replaceSemesterInDegree(newSemester);
    }
    useEffect(() => {
        checkSemester(courses, degree, editDegree);
    }, [semester.courses]);

    return (
        <div>
            <Button
                data-bs-toggle="modal"
                data-toggle="tooltip"
                onClick={() => setModal(true)}
                hidden={!editMode}
                variant="success"
            >
                🖉
            </Button>
            <Modal
                show={modal}
                onHide={() => setModal(false)}
                scrollable={true}
                className="modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div>
                            {semester.season} {semester.year}
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="Align-center">
                        <AddCourse
                            courses={courses}
                            semester={semester}
                            degree={degree}
                            editDegree={editDegree}
                            checkSemester={checkSemester}
                        ></AddCourse>
                    </Row>
                    <Row>
                        <Col className="Align-right">
                            <Button
                                variant="danger"
                                onClick={() => deleteAll(semester)}
                            >
                                Delete All 🗑️
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="Align-right">
                            <SemesterViewModal
                                semester={semester}
                                degree={degree}
                                courses={courses}
                                editDegree={editDegree}
                                deleteCourse={deleteCourse}
                            ></SemesterViewModal>
                        </Col>
                        <br></br>
                    </Row>
                    <br></br>
                    {!semester.errors.every(
                        (error: string) => error === ""
                    ) && <b style={{ color: "red" }}>Errors: </b>}
                    <div>
                        {semester.courses
                            .filter(
                                (course: Course, index: number) =>
                                    semester.errors[index] !== ""
                            )
                            .map((course: Course, index: number) => (
                                <p
                                    key={index}
                                    className="line-break"
                                    data-testid="error_message"
                                >
                                    <span
                                        data-testid="error_message"
                                        style={{ color: "red" }}
                                    >
                                        {course.listing}:{" "}
                                        {
                                            semester.errors.filter(
                                                (error: string) => error !== ""
                                            )[index]
                                        }
                                    </span>
                                </p>
                            ))}
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
