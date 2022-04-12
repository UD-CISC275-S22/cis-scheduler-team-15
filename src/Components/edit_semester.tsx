import React, { useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import { Degree } from "../Interfaces/degree";
import { Semester } from "../Interfaces/semester";
import { SemesterViewModal } from "./SemesterViewModal";

export function EditSemester({
    semester,
    editMode,
    degree,
    editDegree
}: {
    semester: Semester;
    editMode: boolean;
    degree: Degree;
    editDegree: (degreeID: number, newDegree: Degree) => void;
}): JSX.Element {
    //const [currentSemester, editCurrentSemester] = useState<Semester>(semester);
    const [modal, setModal] = useState<boolean>(false);
    function deleteAll(semester: Semester) {
        const newSemester: Semester = {
            semesterID: semester.semesterID,
            season: semester.season,
            year: semester.year,
            courses: []
        };
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
            <Modal show={modal} onHide={() => setModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div>Edit Semester</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Button>Save Edits</Button>
                        </Col>
                        <Col>
                            <Button onClick={() => deleteAll(semester)}>
                                Delete All
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <SemesterViewModal
                            semester={semester}
                        ></SemesterViewModal>
                    </Row>
                </Modal.Body>
            </Modal>
        </div>
    );
}
