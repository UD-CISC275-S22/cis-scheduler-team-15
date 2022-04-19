import { DegreePlans } from "./degree_plans";
import { DegreeRequirements } from "./degree_requirements";
import { CourseList } from "./course_list";
import { Course } from "../Interfaces/course";
import AllCourses from "../Data/course_list.json";
import { useState } from "react";
import React from "react";

const COURSES = AllCourses.map((course): Course => ({ ...course }));

export function CourseState(): JSX.Element {
    const [courses, setCourses] = useState<Course[]>(COURSES); //had to move this state from course_list to here because DegreePlans needs it
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
            <hr></hr>
            <h3>Degree Plans</h3>
            <DegreePlans courses={courses}></DegreePlans>
            <hr></hr>
            <h3>Degree Requirements</h3>
            <DegreeRequirements></DegreeRequirements>
            <hr></hr>
            <h3>Course List</h3>
            <CourseList
                courses={courses}
                editCourses={editCourses}
            ></CourseList>
            <hr></hr>
        </div>
    );
}
