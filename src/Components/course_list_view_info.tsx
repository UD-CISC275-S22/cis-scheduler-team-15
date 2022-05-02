import * as React from "react";
import { Course } from "../Interfaces/course";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { CourseListViewInfoEdit } from "./course_list_view_info_edit";
import "../App.css";

export function CourseListViewInfo({
    course,
    courses,
    editCourses
}: {
    course: Course;
    courses: Course[];
    editCourses: (courseID: number, editedCourse: Course) => void;
}): JSX.Element {
    const [modal, setModal] = useState<boolean>(false);

    function filterPreReq(coursef: Course): string {
        const newCourses: Course[] = courses.filter((course: Course): boolean =>
            coursef.preReqs.includes(course.courseID)
        );
        const listinglist: string[] = newCourses.map(
            (course: Course) => course.listing
        );
        return listinglist.join(", ");
    }

    function filterCoReq(coursef: Course): string {
        const newCourses: Course[] = courses.filter((course: Course): boolean =>
            coursef.coReqs.includes(course.courseID)
        );
        const listinglist: string[] = newCourses.map(
            (course: Course) => course.listing
        );
        return listinglist.join(", ");
    }

    return (
        <span>
            <Button
                className="btn btn-secondary btn-circle btn-sm"
                data-testid={"info-button"}
                data-bs-toggle="modal"
                data-toggle="tooltip"
                title={"Click for more info on " + course.listing}
                onClick={() => setModal(true)}
            >
                <i>i</i>
            </Button>
            <Modal
                size="lg"
                dialogClassName="modal_course_info"
                show={modal}
                onHide={() => setModal(false)}
            >
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
                        {course.preReqs.length === 0
                            ? "N/A"
                            : filterPreReq(course)}
                    </div>
                    <div>
                        <b>Co-Requisite Courses: </b>
                        {course.coReqs.length === 0
                            ? "N/A"
                            : filterCoReq(course)}
                    </div>
                    <div>
                        <b>Semesters Offered: </b>
                        {course.offered.join(", ")}
                    </div>
                    <div>
                        <b>Degree Requirements Satified: </b>
                        {course.reqsSatisfied.length === 0
                            ? "N/A"
                            : course.reqsSatisfied.join(", ")}
                    </div>
                    <div>
                        <CourseListViewInfoEdit
                            course={course}
                            courses={courses}
                            editCourses={editCourses}
                        ></CourseListViewInfoEdit>
                    </div>
                </Modal.Body>
            </Modal>
        </span>
    );
}
