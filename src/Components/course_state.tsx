import { DegreePlans } from "./degree_plans";
import { DegreeRequirements } from "./degree_requirements";
import { CourseList } from "./course_list";
import { Course } from "../Interfaces/course";
import AllCourses from "../Data/course_list.json";
import { useState } from "react";
import React from "react";
import { Button, Stack, Row } from "react-bootstrap";

const COURSES = AllCourses.map((course): Course => ({ ...course }));
const saveCoursesKey = "COURSE-DATA";

export function CourseState(): JSX.Element {
    let courseInput = COURSES;
    const previousData = localStorage.getItem(saveCoursesKey);
    if (previousData !== null) {
        courseInput = JSON.parse(previousData);
    }
    const [courses, setCourses] = useState<Course[]>(courseInput); //had to move this state from course_list to here because DegreePlans needs it

    function editCourses(courseID: number, editedCourse: Course) {
        setCourses(
            courses.map(
                (course: Course): Course =>
                    courseID === course.courseID ? editedCourse : course
            )
        );
    }
    function saveData() {
        localStorage.setItem(saveCoursesKey, JSON.stringify(courses));
    }
    function revert() {
        localStorage.setItem(saveCoursesKey, JSON.stringify(COURSES));
    }

    return (
        <div>
            <hr></hr>
            <Stack gap={2}>
                <Row>
                    <h3>Degree Plans</h3>
                    <DegreePlans courses={courses}></DegreePlans>
                </Row>
                <Row>
                    <hr></hr>
                    <h3>Degree Requirements</h3>
                    <DegreeRequirements></DegreeRequirements>
                </Row>
                <Row>
                    <hr></hr>
                    <h3>Course List</h3>
                    <div>
                        <span>
                            <Button onClick={saveData}>Save Course List</Button>
                        </span>
                        <span>
                            <Button onClick={revert}>
                                Default Course List
                            </Button>
                        </span>
                    </div>
                </Row>
                <Row>
                    <CourseList
                        courses={courses}
                        editCourses={editCourses}
                    ></CourseList>
                </Row>
                <hr></hr>
            </Stack>
        </div>
    );
}
