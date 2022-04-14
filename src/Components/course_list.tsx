import React from "react";
import { useState } from "react";
import { Course } from "../Interfaces/course";
import { Stack, Button } from "react-bootstrap";
import AllCourses from "./../Data/course_list.json";
import { CourseListView } from "./course_list_view";

const COURSES = AllCourses.map((course): Course => ({ ...course }));

export function CourseList(): JSX.Element {
    const [courses, setCourses] = useState<Course[]>(COURSES);
    const [visible, setVisible] = useState<boolean>(true);

    function editCourses(courseID: number, editedCourse: Course) {
        setCourses(
            courses.map(
                (course: Course): Course =>
                    courseID === course.courseID ? editedCourse : course
            )
        );
    }

    return (
        <div>
            <Button onClick={() => setVisible(!visible)}>
                {visible ? "Hide" : "Show"}
            </Button>
            {visible && (
                <Stack gap={2}>
                    {courses.map((course: Course) => (
                        <div key={course.courseID}>
                            <CourseListView
                                course={course}
                                courses={courses}
                                editCourses={editCourses}
                            ></CourseListView>
                        </div>
                    ))}
                </Stack>
            )}
        </div>
    );
}
