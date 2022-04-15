import * as React from "react";
import { Course } from "../Interfaces/course";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

type ChangeEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

export function CourseListViewInfoEdit({
    course,
    courses,
    editCourses
}: {
    course: Course;
    courses: Course[];
    editCourses: (courseID: number, editedCourse: Course) => void;
}): JSX.Element {
    const [edit, setEdit] = useState<boolean>(false);
    const [creditse, setCredits] = useState<number>(course.credits);
    //insert other edit functions

    function createNewCourse(course: Course): Course {
        const newCourse: Course = {
            courseID: course.courseID,
            listing: course.listing,
            title: course.title,
            preReqs: course.preReqs,
            coReqs: course.coReqs,
            offered: course.offered,
            credits: creditse,
            reqsSatisfied: course.reqsSatisfied
        };
        return newCourse;
    }

    return (
        <span>
            <Button onClick={() => setEdit(!edit)}>Edit</Button>
            <div>
                {edit && (
                    <Form>
                        <Form.Group>
                            <Form.Label>Edit Credits</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter number of credit(s)"
                                value={creditse}
                                onChange={(event: ChangeEvent) =>
                                    setCredits(parseInt(event.target.value))
                                }
                            />
                            <Button
                                onClick={() =>
                                    editCourses(
                                        course.courseID,
                                        createNewCourse(course)
                                    )
                                }
                            >
                                Update Credits
                            </Button>
                        </Form.Group>
                    </Form>
                )}
            </div>
        </span>
    );
}
