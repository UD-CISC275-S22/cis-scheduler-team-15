import * as React from "react";
import { Course } from "../Interfaces/Course";
import { Accordion } from "react-bootstrap";
import { CourseListViewInfoEdit } from "./CourseListViewInfoEdit";
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
        <Accordion.Item
            eventKey={course.courseID.toString()}
            data-testid="accordian-item"
        >
            <Accordion.Header>
                {course.listing}: {course.title}
            </Accordion.Header>
            <Accordion.Body>
                <div>
                    <b>Credit(s): </b>
                    {course.credits}
                </div>
                <div>
                    <b>Pre-Requisite Courses: </b>
                    {course.preReqs.length === 0 ? "N/A" : filterPreReq(course)}
                </div>
                <div>
                    <b>Co-Requisite Courses: </b>
                    {course.coReqs.length === 0 ? "N/A" : filterCoReq(course)}
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
            </Accordion.Body>
        </Accordion.Item>
    );
}
