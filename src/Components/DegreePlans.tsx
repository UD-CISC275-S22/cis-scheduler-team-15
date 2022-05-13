import React, { useEffect, useState } from "react";
import { Degree } from "../Interfaces/degree";
import { Stack, Col, Row, Button, Form } from "react-bootstrap";
import PlanDataBA from "../Data/PlanDataBA.json";
import PlanDataBS from "../Data/PlanDataBS.json";
import { DegreePlanView } from "./DegreePlanView";
import { Course } from "../Interfaces/course";
import { Semester } from "../Interfaces/semester";

const DEGREEPLANSTARTBA = PlanDataBA.map((degree): Degree => ({ ...degree }));
const DEGREEPLANSTARTBS = PlanDataBS.map((degree): Degree => ({ ...degree }));
const saveDegreesKey = "DEGREE-DATA";
let degreeInput = DEGREEPLANSTARTBA;

const previousData = localStorage.getItem(saveDegreesKey);

if (previousData !== null) {
    degreeInput = JSON.parse(previousData);
}

export function DegreePlans({
    courses,
    concentration
}: {
    courses: Course[];
    concentration: string;
}): JSX.Element {
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
        setDegreePlans(DEGREEPLANSTARTBA);
        localStorage.setItem(saveDegreesKey, JSON.stringify(DEGREEPLANSTARTBA));
        // if (concentration !== "General (BA)") {
        // } else {
        //     setDegreePlans(DEGREEPLANSTARTBA);
        //     localStorage.setItem(
        //         saveDegreesKey,
        //         JSON.stringify(DEGREEPLANSTARTBA)
        //     );
        // }
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
        const newDegreePlan: Degree = {
            name: "Empty",
            degreeID: newID,
            semesters: []
        };
        setDegreePlans([...degreePlans, newDegreePlan]);
    }

    function addStartDegreePlan(): void {
        const IDList = degreePlans.map((degree: Degree) => degree.degreeID);
        let newPlan = DEGREEPLANSTARTBA[0];
        if (concentration !== "General (BA)") {
            newPlan = DEGREEPLANSTARTBS[0];
        }
        setDegreePlans([
            ...degreePlans,
            {
                ...newPlan,
                degreeID: degreePlans.length > 0 ? Math.max(...IDList) + 1 : 1,
                semesters: newPlan.semesters.map((semester: Semester) => ({
                    ...semester,
                    courses: semester.courses.map(
                        (course: Course): Course => ({
                            ...replaceCourse(course.courseID)
                        })
                    )
                }))
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
        <Stack gap={0} className="App">
            <div className="App-special2">
                <Row>
                    <div className="App-break"></div>
                    <Col xs={1}></Col>
                    <Col xs={4}>
                        <Button
                            onClick={addEmptyDegreePlan}
                            style={{ margin: "5px 0px" }}
                        >
                            <b>Add Empty ➕</b>
                        </Button>
                    </Col>
                    <Col xs={5}>
                        <Button
                            onClick={addStartDegreePlan}
                            style={{ margin: "5px 0px" }}
                        >
                            <b>Add Default (8 semesters) ➕</b>
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            onClick={() => setAddingFile(!addingFile)}
                            variant={addingFile ? "warning" : "primary"}
                            style={{ margin: "5px 0px" }}
                        >
                            <b>
                                {addingFile
                                    ? "Stop Uploading 🛑"
                                    : "Upload Plan ↥"}
                            </b>
                        </Button>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={3} hidden={!addingFile}>
                        <span>
                            <Form.Group controlId="exampleForm">
                                <Form.Control
                                    type="file"
                                    onChange={uploadFile}
                                />
                            </Form.Group>
                        </span>
                    </Col>
                    <Col hidden={!addingFile}>
                        <div>
                            <Button
                                hidden={
                                    content === "Data was not loaded" ||
                                    content === "No file data uploaded"
                                }
                                onClick={addUploadedDegree}
                            >
                                <b>Add ➕</b>
                            </Button>
                        </div>
                    </Col>
                    <Col xs={1}></Col>
                    <Col xs={2}>
                        <Button
                            onClick={saveData}
                            style={{ margin: "5px 0px" }}
                        >
                            <b>Save 💾</b>
                        </Button>
                    </Col>
                    <Col xs={2}>
                        <Button onClick={revert} style={{ margin: "5px 0px" }}>
                            <b>Revert to Default</b>
                        </Button>
                    </Col>
                    <div className="App-break"></div>
                </Row>
            </div>

            <Row>
                <div className="tab">
                    <Col>
                        <div>
                            {degreePlans.map((degree: Degree) => (
                                <Button
                                    key={degree.degreeID}
                                    value={degree.degreeID}
                                    style={{ margin: "0px 5px" }}
                                    className="tablinks"
                                    onClick={() => selectDegreePlan(degree)}
                                    active={
                                        degree.degreeID === currentDegreePlanID
                                    }
                                >
                                    {degree.name}
                                </Button>
                            ))}
                            <span hidden={currentDegreePlanID !== 0}>
                                <b>🠘 Select a Degree Plan to View/Edit</b>
                            </span>
                        </div>
                    </Col>
                </div>

                <div>
                    {degreePlans.map((degree: Degree) => (
                        <span key={degree.degreeID}>
                            <Row>
                                <Col>
                                    <div
                                        hidden={
                                            degree.degreeID !==
                                            currentDegreePlanID
                                        }
                                        className="Align-left2"
                                    >
                                        <h3>Total Credits</h3>
                                    </div>
                                </Col>
                                <Col>
                                    <div
                                        hidden={
                                            degree.degreeID !==
                                            currentDegreePlanID
                                        }
                                        className="App-special3-right"
                                    >
                                        <Button
                                            onClick={() =>
                                                removeDegreePlan(
                                                    currentDegreePlanID
                                                )
                                            }
                                            variant="danger"
                                            style={{ margin: "5px" }}
                                        >
                                            Delete Plan 🗑️
                                        </Button>
                                    </div>
                                </Col>
                            </Row>

                            <div className="App-special3">
                                <DegreePlanView
                                    courses={courses}
                                    degree={degree}
                                    editDegree={editDegreePlan}
                                    hidden={
                                        degree.degreeID !== currentDegreePlanID
                                    }
                                ></DegreePlanView>
                            </div>
                        </span>
                    ))}
                </div>
            </Row>
        </Stack>
    );
}
