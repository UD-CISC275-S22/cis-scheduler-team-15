import React, { useEffect, useState } from "react";
import { Degree } from "../Interfaces/Degree";
import { Stack, Col, Row, Button, Form } from "react-bootstrap";
import PlanDataBA from "../Data/PlanDataBA.json";
import PlanDataBS from "../Data/PlanDataBS.json";
import { Course } from "../Interfaces/Course";
import { Semester } from "../Interfaces/Semester";
import { ManageDegreePlans } from "./ManageDegreePlans";

/* Highest state for the degree plans, which holds the degree plan page view,
as well as the state containing all the degree plans, and the functionality to 
save, revert, update, import, export, view, and edit individual degree plans. */

const DEGREEPLANSTARTBA = PlanDataBA.map((degree): Degree => ({ ...degree }));
const DEGREEPLANSTARTBS = PlanDataBS.map((degree): Degree => ({ ...degree }));
const saveDegreesKey = "DEGREE-DATA2";
let degreeInput = DEGREEPLANSTARTBA;

const previousData = localStorage.getItem(saveDegreesKey);

if (previousData !== null) {
    degreeInput = JSON.parse(previousData);
}

export function DegreePlans({
    courses,
    concentration,
    insertCourse,
    saveCourses,
    revertCourses
}: {
    courses: Course[];
    concentration: string;
    insertCourse: (newCourse: Course) => void;
    saveCourses: () => void;
    revertCourses: () => void;
}): JSX.Element {
    const [degreePlans, setDegreePlans] = useState<Degree[]>(degreeInput);
    const [addingFile, setAddingFile] = useState<boolean>(false);
    const [content, setContent] = useState<string>("No file data uploaded");

    /**Used to avoid infintite loops when checking if a course has updates information that
     * has changed due to editing within the Course List page. Only runs once the courses
     * list has been updated
     */
    useEffect(() => {
        updateDegreePlans(
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

    function updateDegreePlans(degreePlans: Degree[]) {
        setDegreePlans(degreePlans);
    }
    function replaceCourse(coursenum: number): Course {
        //Helper function to replace the course that has updated information
        //that is used within the useEffect function above.
        const courseIDS = courses.map((course: Course) => course.courseID);
        const index = courseIDS.findIndex((x) => x === coursenum);
        const newCourse = courses[index];
        return newCourse;
    }

    function saveData() {
        // Saves all degree plans
        localStorage.setItem(saveDegreesKey, JSON.stringify(degreePlans));
        saveCourses();
    }
    function revert() {
        // Reverts all degree plans back to the single original degree plan
        // The default depends on the selected degree route (BS vs BA)
        if (concentration !== "General (BA)") {
            updateDegreePlans(DEGREEPLANSTARTBS);
            localStorage.setItem(
                saveDegreesKey,
                JSON.stringify(DEGREEPLANSTARTBS)
            );
        } else {
            updateDegreePlans(DEGREEPLANSTARTBA);
            localStorage.setItem(
                saveDegreesKey,
                JSON.stringify(DEGREEPLANSTARTBA)
            );
        }
        revertCourses();
    }

    function uploadFile(event: React.ChangeEvent<HTMLInputElement>) {
        // Takes in a file, checks if it is a csv file, and if so, interprets the data as a string
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
        // CSV parser, taking only a csv file, and outputting only the courses with IDs in the course list
        const semArray = sem.split(",");
        const reducedArray = [...semArray.slice(2)]; // Contains the semester data (not the degree plan name and the degree ID)
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
        let coursesNew: Course[] = [];
        const maxCourseID = Math.max(
            ...courses.map((course: Course) => course.courseID)
        );
        for (let i = 0; i < numCourses; i++) {
            // Find the indices which contain the courseIDs, and check that the ID is in the course list
            if (parseInt(reducedArray[startingInd + 9 * i]) <= maxCourseID) {
                coursesNew = [
                    ...coursesNew,
                    replaceCourse(parseInt(reducedArray[startingInd + 9 * i]))
                ];
            }
        }
        return coursesNew; // List of courses identified in the degreePlan
    }

    function addUploadedDegree() {
        // Calls parser, and inserts a new degree plan into the degree plan list
        const IDList = degreePlans.map((degree: Degree) => degree.degreeID);
        const newID = degreePlans.length > 0 ? Math.max(...IDList) + 1 : 1; // Gives the degree plan a unique ID
        const newDegree = content.split(/[,\n]/);
        const newSemestersString = newDegree.slice(2).join().split("Semester:"); // Only semester data
        const latterSemString = [...newSemestersString.slice(1)]; // Contains only the semester data
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
            // Creates a new plan ID if the ID within the CSV is already in the list of degree plans
            newPlan = {
                ...newPlan,
                degreeID: newID
            };
        }
        updateDegreePlans([...degreePlans, newPlan]);
    }

    function addEmptyDegreePlan(): void {
        // Inputs an empty degree plan into the degree plan list
        const IDList = degreePlans.map((degree: Degree) => degree.degreeID);
        const newID = degreePlans.length > 0 ? Math.max(...IDList) + 1 : 1;
        const newDegreePlan: Degree = {
            name: "Empty",
            degreeID: newID,
            semesters: []
        };
        updateDegreePlans([...degreePlans, newDegreePlan]);
    }

    function addStartDegreePlan(): void {
        // Depending on the concentration, adds a specific starting degree plan populated with courses
        const IDList = degreePlans.map((degree: Degree) => degree.degreeID);
        let newPlan = DEGREEPLANSTARTBA[0];
        if (concentration !== "General (BA)") {
            newPlan = DEGREEPLANSTARTBS[0];
        }
        updateDegreePlans([
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
            <ManageDegreePlans
                degreePlans={degreePlans}
                updateDegreePlans={updateDegreePlans}
                courses={courses}
                concentration={concentration}
                insertCourse={insertCourse}
            ></ManageDegreePlans>
        </Stack>
    );
}
