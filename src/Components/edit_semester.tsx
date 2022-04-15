import React, { useState } from "react";
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
    courses
}: {
    semester: Semester;
    editMode: boolean;
    degree: Degree;
    editDegree: (degreeID: number, newDegree: Degree) => void;
    courses: Course[];
}): JSX.Element {
    //const [currentSemester, editCurrentSemester] = useState<Semester>(semester);
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
            courses: []
        };
        replaceSemesterInDegree(newSemester);
    }

    function deleteCourse(removeCourse: Course, semester: Semester) {
        const newCourses = semester.courses.filter(
            (course: Course): boolean => removeCourse !== course
        );
        const newSemester: Semester = {
            semesterID: semester.semesterID,
            season: semester.season,
            year: semester.year,
            courses: newCourses
        };
        replaceSemesterInDegree(newSemester);
    }
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
                </Modal.Body>
            </Modal>
        </div>
    );
}
