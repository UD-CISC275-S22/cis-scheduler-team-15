import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Degree } from "../Interfaces/degree";
import { Semester } from "../Interfaces/semester";
import { Course } from "../Interfaces/course";

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
    const [moveSemesterID, setMoveSemesterID] = useState<number>(1);
    const [sameSemester, setSameSemester] = useState<boolean>(
        semester.semesterID === moveSemesterID
    );
    function updateSemesterID(event: React.ChangeEvent<HTMLSelectElement>) {
        setMoveSemesterID(Number(event.target.value));
        setSameSemester(semester.semesterID === Number(event.target.value));
    }
    function moveCourse() {
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
            <Button disabled={sameSemester} onClick={moveCourse}>
                Move
            </Button>
            <Form.Group controlId="semester_dropdown">
                <Form.Select value={moveSemesterID} onChange={updateSemesterID}>
                    {degree.semesters.map((semester: Semester) => (
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
        </div>
    );
}
