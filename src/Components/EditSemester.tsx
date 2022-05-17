import React, { useEffect, useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { Degree } from "../Interfaces/Degree";
import { Semester } from "../Interfaces/Semester";
import { Course } from "../Interfaces/Course";
import { SemesterViewModal } from "./SemesterViewModal";
import { AddCourse } from "./AddCourse";
import { ShowSemesterErrors } from "./ShowSemesterErrors";

/*Includes the button shown at the top right of each semester in the full degree plan
view to edit individual semester. When clicked, pulls up the modal that allows for 
viewing details of an individual semester, adding courses, and removing courses*/
export function EditSemester({
    semester,
    editMode,
    degree,
    editDegree,
    courses,
    checkSemester,
    insertCourse
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
    insertCourse: (newCourse: Course) => void;
}): JSX.Element {
    const [modal, setModal] = useState<boolean>(false);

    function replaceSemesterInDegree(newSemester: Semester) {
        //takes a new semester and edits the degree to include that new semester
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
        //deletes all of the courses in a semester
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
        //delete one course in a semester
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

    //runs whenever a semesters courses have changed to check for new errors
    //over the entire degree plan. Prevents an infinite loop since checkSemesters
    //includes a call to editDegree which should only be called once
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
                title={"Click to edit " + semester.season + " " + semester.year}
            >
                🖉
            </Button>
            <Modal
                show={modal}
                onHide={() => setModal(false)}
                scrollable={true}
                className="modal"
                data-testid={semester.season + " " + semester.year + " modal"}
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
                            insertCourse={insertCourse}
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
                    <Row>
                        <ShowSemesterErrors
                            semester={semester}
                        ></ShowSemesterErrors>
                    </Row>
                </Modal.Body>
            </Modal>
        </div>
    );
}
