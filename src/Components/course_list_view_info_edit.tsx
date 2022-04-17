import * as React from "react";
import { Course } from "../Interfaces/course";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import AllCourses from "../Data/course_list.json";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;
const defaultCourseData = AllCourses.map((course): Course => ({ ...course }));

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
    const [listing, setListing] = useState<string>(course.listing);
    const [title, setTitle] = useState<string>(course.title);

    function createNewCourse(course: Course): Course {
        courses;
        const newCourse: Course = {
            courseID: course.courseID,
            listing: listing,
            title: title,
            preReqs: course.preReqs,
            coReqs: course.coReqs,
            offered: course.offered,
            credits: creditse,
            reqsSatisfied: course.reqsSatisfied
        };
        return newCourse;
    }

    function updateTitle(event: ChangeEvent) {
        setTitle(event.target.value);
    }
    function updateListing(event: ChangeEvent) {
        setListing(event.target.value);
    }
    function updateCredits(event: ChangeEvent) {
        setCredits(parseInt(event.target.value));
    }
    function resetDefault(courseID: number) {
        const defaultCourse: Course[] = defaultCourseData.filter(
            (course: Course) => courseID === course.courseID
        );
        editCourses(courseID, defaultCourse[0]);
        setTitle(defaultCourse[0].title);
        setListing(defaultCourse[0].listing);
        setCredits(defaultCourse[0].credits);
    }

    return (
        <span>
            <Button onClick={() => setEdit(!edit)}>
                {edit ? "Hide" : "Edit"}
            </Button>
            <div>
                {edit && (
                    <Form>
                        <hr />
                        <Form.Label>Edit Credits:</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="number"
                                placeholder="Enter number of credit(s)"
                                value={creditse}
                                onChange={updateCredits}
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
                        </InputGroup>
                        <Form.Label>Edit Course Title:</Form.Label>
                        <InputGroup>
                            <Form.Control
                                placeholder="Enter new course title"
                                value={title}
                                onChange={updateTitle}
                            />
                            <Button
                                onClick={() =>
                                    editCourses(
                                        course.courseID,
                                        createNewCourse(course)
                                    )
                                }
                            >
                                Update Title
                            </Button>
                        </InputGroup>
                        <Form.Label>Edit Course Listing:</Form.Label>
                        <InputGroup>
                            <Form.Control
                                placeholder="Enter new listing"
                                value={listing}
                                onChange={updateListing}
                            />
                            <Button
                                onClick={() =>
                                    editCourses(
                                        course.courseID,
                                        createNewCourse(course)
                                    )
                                }
                            >
                                Update Listing
                            </Button>
                        </InputGroup>
                        <hr />
                        <Button onClick={() => resetDefault(course.courseID)}>
                            Reset Course to Default
                        </Button>
                    </Form>
                )}
            </div>
        </span>
    );
}
