import * as React from "react";
import { Course } from "../Interfaces/course";
import { useState } from "react";
import { Accordion, Button, Form, InputGroup, Row, Col } from "react-bootstrap";
import AllCourses from "../Data/course_list.json";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;
const defaultCourseData = AllCourses.map((course): Course => ({ ...course }));
const universtiyCourses = [
    "FYS",
    "ENGL100",
    "Breadth",
    "DLE",
    "Capstone",
    "Multicultural",
    "CAH",
    "HCC",
    "SBS",
    "Science"
];
//Change these to all acronyms?
const college_requirements = ["FL", "SWR"];
const major_requirements = [
    "CISC108",
    "CISC181",
    "CISC210",
    "CISC275",
    "CISC220",
    "CISC260",
    "CISC300+",
    "MATH210",
    "MATH241",
    "BREADTH300+"
];
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

    const [coReqss, setCoReqs] = useState<number[]>(course.coReqs);
    const [newCoID, setNewCoID] = useState<number>(idInitialSetter);
    const [removeCoID, setRemoveCoID] = useState<number>(idInitialSetter);

    const [double, setDouble] = useState<boolean>(false);
    const [doubler, setDoubler] = useState<boolean>(false);
    const [doubleCo, setDoubleCo] = useState<boolean>(false);
    const [doubleCor, setDoubleCor] = useState<boolean>(false);

    const [reqSat, setReqSat] = useState<string[]>(course.reqsSatisfied);

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
            reqsSatisfied: reqSat
        };
        return newCourse;
    }

    function updateReq(event: ChangeEvent) {
        const req = event.target.value;
        if (reqSat.includes(req)) {
            setReqSat(reqSat.filter((e: string) => e !== req));
            const newCourse: Course = {
                courseID: course.courseID,
                listing: listings,
                title: titles,
                preReqs: course.preReqs,
                coReqs: course.coReqs,
                offered: course.offered,
                credits: creditse,
                reqsSatisfied: reqSat.filter((e: string) => e !== req)
            };
            editCourses(course.courseID, newCourse);
        } else {
            const newCourse: Course = {
                courseID: course.courseID,
                listing: listings,
                title: titles,
                preReqs: course.preReqs,
                coReqs: course.coReqs,
                offered: course.offered,
                credits: creditse,
                reqsSatisfied: [...reqSat, req]
            };
            editCourses(course.courseID, newCourse);
            setReqSat([...reqSat, req]);
        }
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
        setCoReqs(defaultCourse[0].coReqs);
        setReqSat(defaultCourse[0].reqsSatisfied);
        editCourses(courseID, defaultCourse[0]);

        setDouble(false);
        setDoubler(false);
        setDoubleCo(false);
        setDoubleCor(false);
    }
    function updateNewID(event: ChangeEvent) {
        setNewID(parseInt(event.target.value));
    }
    function updateRemoveID(event: ChangeEvent) {
        setRemoveID(parseInt(event.target.value));
    }

    function updateNewCoID(event: ChangeEvent) {
        setNewCoID(parseInt(event.target.value));
    }
    function updateRemoveCoID(event: ChangeEvent) {
        setRemoveCoID(parseInt(event.target.value));
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
            setDoubleCo(false);
            setDoubleCor(false);
        } else {
            setDoubler(true);
            setDouble(false);
            setDoubleCo(false);
            setDoubleCor(false);
        }
    }

    function addNewCoReq(courseID: number) {
        if (coReqss.includes(courseID)) {
            setDoubleCo(true);
            setDoubleCor(false);
            setDouble(false);
            setDoubler(false);
        } else {
            setCoReqs([...coReqss, courseID]);
            setDoubleCo(false);
            setDoubleCor(false);
            setDouble(false);
            setDoubler(false);
            const newCourse: Course = {
                courseID: course.courseID,
                listing: listings,
                title: titles,
                preReqs: course.preReqs,
                coReqs: [...coReqss, courseID],
                offered: course.offered,
                credits: creditse,
                reqsSatisfied: course.reqsSatisfied
            };
            editCourses(course.courseID, newCourse);
        }
    }

    function removeCoReq(courseID: number) {
        if (coReqss.includes(courseID)) {
            const removeCoReq = coReqss.filter(
                (courseIDf: number) => courseIDf !== courseID
            );
            setDoubleCo(false);
            const newCourse: Course = {
                courseID: course.courseID,
                listing: listings,
                title: titles,
                preReqs: course.preReqs,
                coReqs: removeCoReq,
                offered: course.offered,
                credits: creditse,
                reqsSatisfied: course.reqsSatisfied
            };
            editCourses(course.courseID, newCourse);
            setCoReqs(removeCoReq);
            setDoubleCor(false);
            setDouble(false);
            setDoubler(false);
        } else {
            setDoubleCor(true);
            setDoubleCo(false);
            setDouble(false);
            setDoubler(false);
        }
    }

    return (
        <span>
            <Button data-testid={"edit-button"} onClick={() => setEdit(!edit)}>
                {edit ? "Hide" : "Edit"}
            </Button>
            <div>
                {edit && (
                    <Row>
                        <Col>
                            <Form>
                                <hr />
                                <Form.Label>
                                    <b>
                                        <u>Edit Credits:</u>
                                    </b>
                                </Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        data-testid={"edit-credits"}
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
                                <Form.Label>
                                    <b>
                                        <u>Edit Course Title:</u>
                                    </b>
                                </Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        data-testid={"edit-title"}
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
                                        data-testid={"edit-listing"}
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
                                    <Form.Select
                                        value={newID}
                                        onChange={updateNewID}
                                    >
                                        {courses
                                            .filter(
                                                (coursef: Course) =>
                                                    coursef.courseID !==
                                                    course.courseID
                                            )
                                            .map((coursem: Course) => (
                                                <option
                                                    key={coursem.courseID}
                                                    value={coursem.courseID}
                                                    data-testid="add-preReq"
                                                >
                                                    {coursem.listing}
                                                </option>
                                            ))}
                                    </Form.Select>
                                    <Button onClick={() => addNewPreReq(newID)}>
                                        Add PreReq
                                    </Button>
                                </InputGroup>
                                <InputGroup>
                                    <Form.Select
                                        value={removeID}
                                        onChange={updateRemoveID}
                                    >
                                        {courses
                                            .filter(
                                                (coursef: Course) =>
                                                    coursef.courseID !==
                                                    course.courseID
                                            )
                                            .map((coursem: Course) => (
                                                <option
                                                    key={coursem.courseID}
                                                    value={coursem.courseID}
                                                    data-testid="remove-preReq"
                                                >
                                                    {coursem.listing}
                                                </option>
                                            ))}
                                    </Form.Select>
                                    <Button
                                        onClick={() => removePreReq(removeID)}
                                    >
                                        Remove PreReq
                                    </Button>
                                </InputGroup>
                                <div className="text-danger">
                                    {double && "Course already a PreReq"}
                                </div>
                                <div className="text-danger">
                                    {doubler && "Course not one of the PreReqs"}
                                </div>
                                <Form.Label>Edit Co-Requisites:</Form.Label>
                                <InputGroup>
                                    <Form.Select
                                        value={newCoID}
                                        onChange={updateNewCoID}
                                    >
                                        {courses
                                            .filter(
                                                (coursef: Course) =>
                                                    coursef.courseID !==
                                                    course.courseID
                                            )
                                            .map((coursem: Course) => (
                                                <option
                                                    key={coursem.courseID}
                                                    value={coursem.courseID}
                                                    data-testid={"add-coReq"}
                                                >
                                                    {coursem.listing}
                                                </option>
                                            ))}
                                    </Form.Select>
                                    <Button
                                        onClick={() => addNewCoReq(newCoID)}
                                    >
                                        Add CoReq
                                    </Button>
                                </InputGroup>
                                <InputGroup>
                                    <Form.Select
                                        value={removeCoID}
                                        onChange={updateRemoveCoID}
                                    >
                                        {courses
                                            .filter(
                                                (coursef: Course) =>
                                                    coursef.courseID !==
                                                    course.courseID
                                            )
                                            .map((coursem: Course) => (
                                                <option
                                                    key={coursem.courseID}
                                                    value={coursem.courseID}
                                                    data-testid="remove-coReq"
                                                >
                                                    {coursem.listing}
                                                </option>
                                            ))}
                                    </Form.Select>
                                    <Button
                                        onClick={() => removeCoReq(removeCoID)}
                                    >
                                        Remove CoReq
                                    </Button>
                                </InputGroup>
                                <div className="text-danger">
                                    {doubleCo && "Course already a CoReq"}
                                </div>
                                <div className="text-danger">
                                    {doubleCor &&
                                        "Course not one of the CoReqs"}
                                </div>
                            </Form>
                        </Col>
                        <Col>
                            <hr />
                            <div>Edit Degree Requirements:</div>
                            <Accordion>
                                <Accordion.Item
                                    eventKey="0"
                                    data-testid={"edit-univ-req-accordian"}
                                >
                                    <Accordion.Header>
                                        Adjust University Requirement Satisfied:
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {universtiyCourses.map(
                                            (req: string, index: number) => (
                                                <Form.Check
                                                    data-testid={
                                                        "edit-univ-req-option"
                                                    }
                                                    key={index}
                                                    type="checkbox"
                                                    label={req}
                                                    value={req}
                                                    checked={reqSat.includes(
                                                        req
                                                    )}
                                                    onChange={updateReq}
                                                ></Form.Check>
                                            )
                                        )}
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item
                                    eventKey="1"
                                    data-testid={"edit-coll-req-accordian"}
                                >
                                    <Accordion.Header>
                                        Adjust College Requirement Satisfied:
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {college_requirements.map(
                                            (req: string, index: number) => (
                                                <Form.Check
                                                    data-testid={
                                                        "edit-coll-req-option"
                                                    }
                                                    key={index}
                                                    type="checkbox"
                                                    label={req}
                                                    value={req}
                                                    checked={reqSat.includes(
                                                        req
                                                    )}
                                                    onChange={updateReq}
                                                ></Form.Check>
                                            )
                                        )}
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item
                                    eventKey="2"
                                    data-testid={"edit-coll-major-accordian"}
                                >
                                    <Accordion.Header>
                                        Adjust Major Requirements Satisfied:
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {major_requirements.map(
                                            (req: string, index: number) => (
                                                <Form.Check
                                                    data-testid={
                                                        "edit-major-req-option"
                                                    }
                                                    key={index}
                                                    type="checkbox"
                                                    label={req}
                                                    value={req}
                                                    checked={reqSat.includes(
                                                        req
                                                    )}
                                                    onChange={updateReq}
                                                ></Form.Check>
                                            )
                                        )}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            <hr />
                            <Button
                                onClick={() => resetDefault(course.courseID)}
                            >
                                Reset Course to Default
                            </Button>
                        </Col>
                    </Row>
                )}
            </div>
        </span>
    );
}
