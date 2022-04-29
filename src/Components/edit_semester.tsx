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
    checkSemester,
    updateEditCount
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
    updateEditCount: () => void;
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
        updateEditCount();
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
        updateEditCount();
    }
    useEffect(() => {
        checkSemester(courses, degree, editDegree);
        console.log(
            "useEffect in editSemester runs with semester.courses dependency"
        );
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
                Edit
            </Button>
            <Modal
                show={modal}
                onHide={() => setModal(false)}
                scrollable={true}
                dialogClassName="modal-1000h"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div>Edit Semester</div>
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
                            updateEditCount={updateEditCount}
                        ></AddCourse>
                    </Row>
                    <Row className="Align-right">
                        <Col>
                            <Button
                                variant="danger"
                                onClick={() => deleteAll(semester)}
                            >
                                Delete All
                            </Button>
                        </Col>
                    </Row>
                    <br></br>
                    <SemesterViewModal
                        semester={semester}
                        deleteCourse={deleteCourse}
                    ></SemesterViewModal>
                    <div>
                        {semester.courses
                            .filter(
                                (course: Course, index: number) =>
                                    semester.errors[index] !== ""
                            )
                            .map((course: Course, index: number) => (
                                <p key={index} className="line-break">
                                    <span>
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
