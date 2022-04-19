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
    const [listings, setListing] = useState<string>(course.listing);
    const [titles, setTitle] = useState<string>(course.title);
    const [preReqss, setPreReqs] = useState<number[]>(course.preReqs);
    const [newID, setNewID] = useState<number>(idInitialSetter);
    const [removeID, setRemoveID] = useState<number>(idInitialSetter);
    const [double, setDouble] = useState<boolean>(false);
    const [doubler, setDoubler] = useState<boolean>(false);

    function idInitialSetter(): number {
        if (course.courseID === 1) {
            return 2;
        } else {
            return 1;
        }
    }
    function createNewCourse(coursen: Course): Course {
        const newCourse: Course = {
            courseID: coursen.courseID,
            listing: listings,
            title: titles,
            preReqs: preReqss,
            coReqs: coursen.coReqs,
            offered: coursen.offered,
            credits: creditse,
            reqsSatisfied: coursen.reqsSatisfied
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
            (coursed: Course) => courseID === coursed.courseID
        );
        setTitle(defaultCourse[0].title);
        setListing(defaultCourse[0].listing);
        setCredits(defaultCourse[0].credits);
        setPreReqs(defaultCourse[0].preReqs);
        editCourses(courseID, defaultCourse[0]);
        setDouble(false);
        setDoubler(false);
    }
    function updateNewID(event: ChangeEvent) {
        setNewID(parseInt(event.target.value));
    }
    function updateRemoveID(event: ChangeEvent) {
        setRemoveID(parseInt(event.target.value));
    }

    function addNewPreReq(courseID: number) {
        if (preReqss.includes(courseID)) {
            setDouble(true);
            setDoubler(false);
        } else {
            setPreReqs([...preReqss, courseID]);
            setDouble(false);
            setDoubler(false);
            const newCourse: Course = {
                courseID: course.courseID,
                listing: listings,
                title: titles,
                preReqs: [...preReqss, courseID],
                coReqs: course.coReqs,
                offered: course.offered,
                credits: creditse,
                reqsSatisfied: course.reqsSatisfied
            };
            editCourses(course.courseID, newCourse);
        }
    }

    function removePreReq(courseID: number) {
        if (preReqss.includes(courseID)) {
            const removePreReq = preReqss.filter(
                (courseIDf: number) => courseIDf !== courseID
            );
            setDouble(false);
            const newCourse: Course = {
                courseID: course.courseID,
                listing: listings,
                title: titles,
                preReqs: removePreReq,
                coReqs: course.coReqs,
                offered: course.offered,
                credits: creditse,
                reqsSatisfied: course.reqsSatisfied
            };
            editCourses(course.courseID, newCourse);
            setPreReqs(removePreReq);
            setDoubler(false);
            setDouble(false);
        } else {
            setDoubler(true);
            setDouble(false);
        }
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
                                value={titles}
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
                                value={listings}
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
                        <Form.Label>Edit Pre-Requisites:</Form.Label>
                        <InputGroup>
                            <Form.Select value={newID} onChange={updateNewID}>
                                {courses
                                    .filter(
                                        (coursef: Course) =>
                                            coursef.courseID !== course.courseID
                                    )
                                    .map((coursem: Course) => (
                                        <option
                                            key={coursem.courseID}
                                            value={coursem.courseID}
                                        >
                                            {coursem.listing}
                                        </option>
                                    ))}
                            </Form.Select>
                            <Button onClick={() => addNewPreReq(newID)}>
                                Add PreReq
                            </Button>
                            <Form.Select
                                value={removeID}
                                onChange={updateRemoveID}
                            >
                                {courses
                                    .filter(
                                        (coursef: Course) =>
                                            coursef.courseID !== course.courseID
                                    )
                                    .map((coursem: Course) => (
                                        <option
                                            key={coursem.courseID}
                                            value={coursem.courseID}
                                        >
                                            {coursem.listing}
                                        </option>
                                    ))}
                            </Form.Select>
                            <Button onClick={() => removePreReq(removeID)}>
                                Remove PreReq
                            </Button>
                        </InputGroup>
                        <div>{double && "Course already a PreReq"}</div>
                        <div>{doubler && "Course not one of the PreReqs"}</div>
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
