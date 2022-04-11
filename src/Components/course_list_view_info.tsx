import * as React from "react";
import { Course } from "../Interfaces/course";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";

export function CourseListViewInfo({
    course
}: {
    course: Course;
}): JSX.Element {
    const [modal, setModal] = useState<boolean>(false);

    return (
        <span>
            <Button
                className="btn btn-secondary btn-circle btn-sm"
                data-bs-toggle="modal"
                data-toggle="tooltip"
                title={"Click for more info on " + course.listing}
                onClick={() => setModal(true)}
            >
                <i>i</i>
            </Button>
            <Modal show={modal} onHide={() => setModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div>
                            {course.listing}: {course.title}
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <b>Credit(s): </b>
                        {course.credits}
                    </div>
                    <div>
                        <b>Pre-Requistie Courses: </b>
                        {course.preReqs.length === 0 ? "N/A" : course.preReqs}
                    </div>
                    <div>
                        <b>Co-Requisite Courses: </b>
                        {course.coReqs.length === 0 ? "N/A" : course.coReqs}
                    </div>
                    <div>
                        <b>Semesters Offered: </b>
                        {course.offered.map((year: string) => (
                            <span key={year}>{year} </span>
                        ))}
                    </div>
                </Modal.Body>
            </Modal>
        </span>
    );
}
