import React, { useEffect, useState } from "react";
import { Degree } from "../Interfaces/degree";
import { Stack, ToggleButton, Col, Row, Button, Form } from "react-bootstrap";
import PlanData from "./../Data/plan_data.json";
import { DegreePlanView } from "./degree_plan_view";
import { Course } from "../Interfaces/course";
import { Semester } from "../Interfaces/semester";

const DEGREEPLANSTART = PlanData.map((degree): Degree => ({ ...degree }));
const saveDegreesKey = "DEGREE-DATA";

export function DegreePlans({ courses }: { courses: Course[] }): JSX.Element {
    let degreeInput = DEGREEPLANSTART;
    const previousData = localStorage.getItem(saveDegreesKey);

    if (previousData !== null) {
        degreeInput = JSON.parse(previousData);
    }

    const [degreePlans, setDegreePlans] = useState<Degree[]>(degreeInput);
    const [currentDegreePlanID, setCurrentDegreePlanID] = useState<number>(0);
    const [addingFile, setAddingFile] = useState<boolean>(false);
    const [content, setContent] = useState<string>("No file data uploaded");

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
            if (filename.name.endsWith(".csv")) {
                const reader = new FileReader();
                reader.onload = (loadEvent) => {
                    const newContent =
                        loadEvent.target?.result || "Data was not loaded";
                    setContent(newContent as string);
                };
                reader.readAsText(filename);
            } else {
                setContent("Data was not loaded");
            }
        }
    }
    function setCoursesCSV(sem: string): Course[] {
        const semArray = sem.split(",");
        const reducedArray = [...semArray.slice(2)];
        const startingInd =
            reducedArray.findIndex((str: string) => str === semArray[1]) + 1;
        const courseInds = [
            ...reducedArray.filter(
                (str: string, ind: number) => ind % 9 === (startingInd - 1) % 9
            )
        ];
        const numCourses = [
            ...courseInds.filter((str: string) => str === semArray[1])
        ].length;
        let courses: Course[] = [];
        for (let i = 0; i < numCourses; i++) {
            console.log("CourseID: ", reducedArray[startingInd + 9 * i]);
            courses = [
                ...courses,
                replaceCourse(parseInt(reducedArray[startingInd + 9 * i]))
            ];
        }
        return courses;
    }

    /*
    function setCoursesCSV(sem: string): Course[] {
        const semArray = sem.split(",");
        const reducedArray = [...semArray.slice(2)];
        console.log(semArray);
        console.log(reducedArray);
        const startingInd =
            reducedArray.findIndex((str: string) => str === semArray[1]) + 1;
        const courseInds = [
            ...reducedArray.filter(
                (str: string, ind: number) => ind % 9 === (startingInd - 1) % 9
            )
        ];
        const numCourses = [
            ...courseInds.filter((str: string) => str === semArray[1])
        ].length;
        console.log("courseInds: ", courseInds);
        console.log("NumCourses:", numCourses);
        let courses: Course[] = [];
        for (let i = 0; i < numCourses; i++) {
            console.log("i = ", i);
            const newCourse: Course = {
                courseID: parseInt(reducedArray[startingInd + 8 * i]),
                listing: reducedArray[startingInd + 1 + 8 * i],
                title: reducedArray[startingInd + 2 + 8 * i],
                preReqs: [
                    ...reducedArray[startingInd + 3 + 8 * i]
                        .split("-")
                        .map((str: string) => parseInt(str))
                ],
                coReqs: [
                    ...reducedArray[startingInd + 4 + 8 * i]
                        .split("-")
                        .map((str: string) => parseInt(str))
                ],
                offered: [...reducedArray[startingInd + 5 + 8 * i].split("-")],
                credits: parseInt(reducedArray[startingInd + 6 + 8 * i]),
                reqsSatisfied: [
                    ...reducedArray[startingInd + 7 + 8 * i].split("-")
                ]
            };
            courses = [...courses, newCourse];
        }
        return courses;
    }
    */
    function addUploadedDegree() {
        const IDList = degreePlans.map((degree: Degree) => degree.degreeID);
        const newID = degreePlans.length > 0 ? Math.max(...IDList) + 1 : 1;
        const newDegree = content.split(/[,\n]/);
        const newSemestersString = newDegree.slice(2).join().split("Semester:"); // Only semester data
        const latterSemString = [...newSemestersString.slice(1)];
        const semesters = latterSemString.map(
            (sem: string): Semester => ({
                semesterID: parseInt(sem.split(",")[1]),
                season: sem.split(",")[2],
                year: parseInt(sem.split(",")[3]),
                courses: setCoursesCSV(sem),
                errors: Array(setCoursesCSV(sem).length)
            })
        );
        let newPlan: Degree = {
            name: newDegree[1],
            degreeID: parseInt(newDegree[0]),
            semesters: [...semesters]
        };
        if (
            degreePlans
                .map((degree: Degree) => degree.degreeID)
                .includes(newPlan.degreeID)
        ) {
            newPlan = {
                ...newPlan,
                degreeID: newID
            };
        }
        setDegreePlans([...degreePlans, newPlan]);
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
                degreeID: degreePlans.length > 0 ? Math.max(...IDList) + 1 : 1,
                semesters: DEGREEPLANSTART[0].semesters.map(
                    (semester: Semester) => ({
                        ...semester,
                        courses: semester.courses.map(
                            (course: Course): Course => ({
                                ...replaceCourse(course.courseID)
                            })
                        )
                    })
                )
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
        newDegreePlan.semesters.map((semester: Semester) =>
            semester.courses.sort((course1, course2) =>
                course1.listing < course2.listing ? -1 : 1
            )
        );
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
                <Col>
                    <span>
                        <Form.Group controlId="exampleForm">
                            <Form.Control type="file" onChange={uploadFile} />
                        </Form.Group>
                    </span>
                </Col>
                <Col>
                    <div>
                        <Button
                            hidden={
                                content === "Data was not loaded" ||
                                content === "No file data uploaded"
                            }
                            onClick={addUploadedDegree}
                        >
                            Add Uploaded Plan
                        </Button>
                    </div>
                </Col>
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
