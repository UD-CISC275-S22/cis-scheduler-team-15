import React from "react";
import { useState } from "react";
import { Course } from "../Interfaces/course";
import { Stack, Button } from "react-bootstrap";
import AllCourses from "./../Data/course_list.json";
import { CourseListView } from "./course_list_view";

const COURSES = AllCourses.map((course): Course => ({ ...course }));

export function CourseList(): JSX.Element {
    const [courses] = useState<Course[]>(COURSES);
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <div>
            <Button onClick={() => setVisible(!visible)}>
                {visible ? "Hide" : "Show"}
            </Button>
            {visible && (
                <Stack gap={2}>
                    {courses.map((course: Course) => (
                        <div key={course.courseID}>
                            <CourseListView course={course}></CourseListView>
                        </div>
                    ))}
                </Stack>
            )}
        </div>
    );
}
