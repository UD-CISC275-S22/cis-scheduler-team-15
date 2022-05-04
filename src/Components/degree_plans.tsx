import React, { useEffect, useState } from "react";
import { Degree } from "../Interfaces/degree";
import { Stack, ToggleButton, Col, Row, Button, Form } from "react-bootstrap";
import PlanData from "./../Data/plan_data.json";
import { DegreePlanView } from "./degree_plan_view";
import { Course } from "../Interfaces/course";
import { Semester } from "../Interfaces/semester";

const DEGREEPLANSTART = PlanData.map((degree): Degree => ({ ...degree }));
const saveDegreesKey = "DEGREE-DATA";

export function DegreePlans({
    courses,
    update,
    updateUpdate
}: {
    courses: Course[];
    update: boolean;
    updateUpdate: (input: boolean) => void;
}): JSX.Element {
    let degreeInput = DEGREEPLANSTART;
    const previousData = localStorage.getItem(saveDegreesKey);

    if (previousData !== null) {
        console.log(JSON.parse(previousData));

        degreeInput = JSON.parse(previousData);
    }

    const [degreePlans, setDegreePlans] = useState<Degree[]>(degreeInput);
    const [currentDegreePlanID, setCurrentDegreePlanID] = useState<number>(0);
    const [addingFile, setAddingFile] = useState<boolean>(false);

    useEffect(() => {
        setDegreePlans(
            degreePlans.map((degree: Degree) => ({
                ...degree,
                semesters: degree.semesters.map((semester: Semester) => ({
                    ...semester,
                    courses: semester.courses.map(
                        (course: Course): Course => ({
                            ...replaceCourse(course.courseID)
                        })
                    )
                }))
            }))
        );
    }, [courses]);

    function replaceCourse(coursenum: number): Course {
        const courseIDS = courses.map((course: Course) => course.courseID);
        const index = courseIDS.findIndex((x) => x === coursenum);
        const newCourse = courses[index];
        return newCourse;
    }

    function updateDegreePlans(ucourses: Course[]) {
        const updateDegreeP: Degree[] = degreePlans.map((degree: Degree) => ({
            ...degree,
            semesters: degree.semesters.map((semester: Semester) => ({
                ...semester,
                courses: semester.courses.map(
                    (course: Course): Course => ({
                        ...course
                    })
                )
            }))
        }));
        setDegreePlans(updateDegreeP);
    }

    function saveData() {
        console.log(JSON.stringify(degreePlans));
        localStorage.setItem(saveDegreesKey, JSON.stringify(degreePlans));
    }
    function revert() {
        setDegreePlans(DEGREEPLANSTART);
        localStorage.setItem(saveDegreesKey, JSON.stringify(DEGREEPLANSTART));
    }

    function uploadFile(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files.length) {
            const filename = event.target.files[0];
            const reader = new FileReader();
            reader.readAsText(filename);
        }
    }

    function addEmptyDegreePlan(): void {
        const IDList = degreePlans.map((degree: Degree) => degree.degreeID);
        const newID = degreePlans.length > 0 ? Math.max(...IDList) + 1 : 1;
        const newName = "Degree plan " + newID;
        const newDegreePlan: Degree = {
            name: newName,
            degreeID: newID,
            semesters: []
        };
        setDegreePlans([...degreePlans, newDegreePlan]);
    }

    function addStartDegreePlan(): void {
        const IDList = degreePlans.map((degree: Degree) => degree.degreeID);
        setDegreePlans([
            ...degreePlans,
            {
                ...DEGREEPLANSTART[0],
                degreeID: degreePlans.length > 0 ? Math.max(...IDList) + 1 : 1
            }
        ]);
    }

    function removeDegreePlan(degreeID: number): void {
        setDegreePlans(
            degreePlans.filter((degree: Degree) => degree.degreeID !== degreeID)
        );
    }

    function selectDegreePlan(degree: Degree): void {
        setCurrentDegreePlanID(
            degree.degreeID === currentDegreePlanID ? 0 : degree.degreeID
        );
    }

    function sortSemesters(degree: Degree): Degree {
        let newSemesters = [...degree.semesters];
        newSemesters = newSemesters.sort(
            (a: Semester, b: Semester): number =>
                a.year -
                b.year +
                (["Winter", "Spring", "Summer", "Fall"].indexOf(a.season) / 4 -
                    ["Winter", "Spring", "Summer", "Fall"].indexOf(b.season) /
                        4)
        );
        return (
            degree.degreeID,
            {
                ...degree,
                semesters: newSemesters
            }
        );
    }

    function editDegreePlan(degreeID: number, newDegreePlan: Degree) {
        newDegreePlan = sortSemesters(newDegreePlan);
        setDegreePlans(
            degreePlans.map(
                (degree: Degree): Degree =>
                    degree.degreeID === degreeID ? newDegreePlan : degree
            )
        );
    }
    return (
        <Stack gap={2}>
            <Row>
                <div>
                    <span>
                        <Button onClick={saveData} variant="outline-primary">
                            Save Degree Plans
                        </Button>
                    </span>
                    <span>
                        <Button onClick={revert} variant="outline-warning">
                            Revert to Default
                        </Button>
                    </span>
                </div>
            </Row>
            <Row>
                <Col>
                    <Button onClick={addEmptyDegreePlan}>Add Empty plan</Button>
                </Col>
                <Col xs={3}>
                    <Button onClick={addStartDegreePlan}>
                        Add Default Plan (8 semesters)
                    </Button>
                </Col>
                <Col>
                    <Button
                        onClick={() => setAddingFile(!addingFile)}
                        variant={addingFile ? "warning" : "primary"}
                    >
                        {addingFile ? "Stop Uploading" : "Upload Degree Plan"}
                    </Button>
                </Col>
                <Col>
                    <Button
                        onClick={() => removeDegreePlan(currentDegreePlanID)}
                        variant={
                            currentDegreePlanID === 0
                                ? "outline-danger"
                                : "danger"
                        }
                    >
                        Delete selected plan
                    </Button>
                </Col>
            </Row>
            <Row hidden={!addingFile}>
                <span>
                    <Form.Group controlId="exampleForm">
                        <Form.Control type="file" onChange={uploadFile} />
                    </Form.Group>
                </span>
            </Row>
            <Row>
                <Col>
                    <div className="App">
                        {degreePlans.map((degree: Degree) => (
                            <span
                                key={degree.degreeID}
                                style={{ margin: "5px" }}
                            >
                                <ToggleButton
                                    value={degree.degreeID}
                                    key={degree.degreeID}
                                    variant={
                                        degree.degreeID === currentDegreePlanID
                                            ? "primary"
                                            : "outline-primary"
                                    }
                                    checked={
                                        degree.degreeID === currentDegreePlanID
                                    }
                                    onClick={() => selectDegreePlan(degree)}
                                >
                                    {degree.degreeID}: {degree.name}
                                </ToggleButton>
                            </span>
                        ))}
                        {degreePlans.map((degree: Degree) => (
                            <span key={degree.degreeID}>
                                <DegreePlanView
                                    courses={courses}
                                    degree={degree}
                                    editDegree={editDegreePlan}
                                    hidden={
                                        degree.degreeID !== currentDegreePlanID
                                    }
                                ></DegreePlanView>
                            </span>
                        ))}
                    </div>
                </Col>
            </Row>
        </Stack>
    );
}
