import React, { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { Degree } from "../Interfaces/Degree";
import { Semester } from "../Interfaces/Semester";
import { Course } from "../Interfaces/Course";

/*Includes a dropdown of other semester in the plan and a button
which can be used to move courses between semesters*/
export function MoveCourse({
    semester,
    degree,
    editDegree,
    course
}: {
    semester: Semester;
    degree: Degree;
    editDegree: (degreeID: number, newDegree: Degree) => void;
    course: Course;
}): JSX.Element {
    let newSemesterID = semester.semesterID;
    if (degree.semesters.length > 1) {
        newSemesterID = degree.semesters.filter(
            (currSemester: Semester): boolean =>
                currSemester.semesterID !== semester.semesterID
        )[0].semesterID;
    }
    const [moveSemesterID, setMoveSemesterID] = useState<number>(newSemesterID);

    function updateSemesterID(event: React.ChangeEvent<HTMLSelectElement>) {
        //sets the state for the semester being moved to
        setMoveSemesterID(Number(event.target.value));
    }

    function moveCourse() {
        //moves a course between semesters by creating to new semesters:
        //the one being moved from and the one being moved to.
        //calls editDegree to replace these semesters in the plan
        const currentSemesterCourses = semester.courses.filter(
            (currCourse: Course): boolean =>
                course.courseID !== currCourse.courseID
        );
        const newCurrentSemester: Semester = {
            ...semester,
            courses: currentSemesterCourses
        };
        const moveSemester = degree.semesters.filter(
            (semester: Semester): boolean =>
                semester.semesterID === moveSemesterID
        )[0];
        const newMoveSemester: Semester = {
            ...moveSemester,
            courses: [...moveSemester.courses, course]
        };
        const newSemesters = [
            ...degree.semesters.filter(
                (currSemester: Semester): boolean =>
                    currSemester.semesterID !== newMoveSemester.semesterID &&
                    currSemester.semesterID !== newCurrentSemester.semesterID
            ),
            newMoveSemester,
            newCurrentSemester
        ];
        const newDegree: Degree = { ...degree, semesters: newSemesters };
        editDegree(newDegree.degreeID, newDegree);
    }

    return (
        <div>
            <Row>
                <Form.Group
                    controlId="semester_dropdown"
                    className="dropdown_semesters"
                >
                    <Form.Select
                        value={moveSemesterID}
                        onChange={updateSemesterID}
                    >
                        {degree.semesters
                            .filter(
                                (currSemester: Semester): boolean =>
                                    currSemester.semesterID !==
                                    semester.semesterID
                            )
                            .map((semester: Semester) => (
                                <option
                                    key={semester.semesterID}
                                    value={semester.semesterID}
                                    data-testid="change-semester-select"
                                >
                                    {semester.season} {semester.year.toString()}
                                </option>
                            ))}
                    </Form.Select>
                </Form.Group>
                <Button
                    onClick={moveCourse}
                    title={"Click to move"}
                    className="button_move_semester"
                    data-testid="move-course-button"
                >
                    ???
                </Button>
            </Row>
        </div>
    );
}
