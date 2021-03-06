import { DegreePlans } from "./DegreePlans";
import { DegreeRequirements } from "./DegreeRequirements";
import { CourseList } from "./CourseList";
import { Course } from "../Interfaces/Course";
import AllCourses from "../Data/CourseList.json";
import { useState } from "react";
import React from "react";
import "../App.css";
import { Button, Stack, Row, Col, Form } from "react-bootstrap";

/* Top level state which instantiates the courses, displays the home page, 
and allows for navigation to subpages. */

const COURSES = AllCourses.map((course): Course => ({ ...course }));
const CONCENTRATONS = [
    "General (BA)",
    "Artificial Intelligence and Robotics (BS)",
    "Bioinformatics (BS)",
    "Cybersecurity (BS)",
    "Data Science (BS)",
    "High Performance Computing (BS)",
    "Systems and Networks (BS)",
    "Theory and Computation (BS)"
];
const saveCoursesKey = "COURSE-DATA2";
// CourseInput sorts the inputted JSON course data alphanumerically
let courseInput = COURSES.sort((a, b) => {
    const fa = a.listing.toLowerCase();
    const fb = b.listing.toLowerCase();
    if (fa < fb) {
        return -1;
    } else if (fb > fa) {
        return 1;
    } else {
        return 0;
    }
});

const previousData = localStorage.getItem(saveCoursesKey);
if (previousData !== null) {
    // Checks whether data is stored locally for the course list and updates the starting state of the course list accordingly
    courseInput = JSON.parse(previousData);
}

export function CourseState(): JSX.Element {
    const [courses, setCourses] = useState<Course[]>(courseInput); //had to move this state from course_list to here because DegreePlans needs it
    const [home, setHome] = useState<boolean>(true);
    const [planView, setPlanView] = useState<boolean>(false);
    const [courseView, setCourseView] = useState<boolean>(false);
    const [concentration, setConcentration] = useState<string>(
        CONCENTRATONS[0]
    );

    function editCourses(courseID: number, editedCourse: Course) {
        // Updates the courselist with a course that was modified
        setCourses(
            courses.map(
                (course: Course): Course =>
                    courseID === course.courseID ? editedCourse : course
            )
        );
    }
    function insertCourse(newCourse: Course) {
        // Adds a course to the course list
        setCourses([...courses, newCourse]);
    }
    function saveData() {
        // Saves the current course list locally
        localStorage.setItem(saveCoursesKey, JSON.stringify(courses));
    }
    function revert() {
        // If the user chooses to go back to the default, this function allows
        // the course list to return to the original sorted JSON course list
        setCourses(COURSES);
        localStorage.setItem(saveCoursesKey, JSON.stringify(COURSES));
    }

    function moveHome() {
        // Moves to the home page
        setHome(true);
        setPlanView(false);
        setCourseView(false);
    }

    function movePlanView() {
        // Moves to the degree plan page
        setHome(false);
        setPlanView(true);
        setCourseView(false);
    }

    function moveCourseView() {
        // Moves to the course list page
        setHome(false);
        setPlanView(false);
        setCourseView(true);
    }

    function updateConcentration(event: React.ChangeEvent<HTMLSelectElement>) {
        // Channges the current concentration, which changes the list of degree requirements,
        // the default plan (depending on BS or BA route), and the degree requirement checking
        setConcentration(event.target.value);
    }

    return (
        <div>
            <Stack gap={2}>
                <div hidden={!home}>
                    <div className="App-header">
                        <h1>UD Degree Plan Tester</h1>
                        <div className="App-special">
                            <img
                                src="https://clipartix.com/wp-content/uploads/2016/04/Paper-clip-art-free-free-clipart-images-clipartcow.png"
                                width="100"
                                height="100"
                            />
                        </div>
                    </div>
                    <div></div>
                    <h3>Instructions:</h3>
                    <div className="App-thin">
                        This application is developed with the intent of helping
                        University of Delaware Computer Science (CISC) majors
                        determine the degree plan best suited to their
                        interests, while still meeting degree requirements. To
                        navigate this page, select an existing or new degree
                        plan. Within the plan you can edit and view the
                        semesters and classes you would like. When you are
                        satisfied with the plan, you can check to see if all the
                        degree requirements have been met. A list of commonly
                        offered CISC courses has been provided. For further
                        information on available breadth and technical elective
                        courses, you can refer to the following links. Best of
                        luck in navigating your future!
                    </div>
                    <hr></hr>
                    <Row>
                        <Col>
                            <b>Start Making a Degree Plan</b>
                        </Col>
                        <Col>
                            <b>Select a Degree Concentration</b>
                        </Col>
                        <Col>
                            <b>Investigate Existing Courses</b>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h1>???</h1>
                        </Col>
                        <Col>
                            <h1>???</h1>
                        </Col>
                        <Col>
                            <h1>???</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={movePlanView}>
                                Move to Degree Plans ????
                            </Button>
                        </Col>
                        <Col>
                            <Form.Group controlId="concentration">
                                <Form.Select
                                    value={concentration}
                                    onChange={updateConcentration}
                                >
                                    {CONCENTRATONS.map((conc: string) => (
                                        <option key={conc} value={conc}>
                                            {conc}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Button onClick={moveCourseView}>
                                Move to Course List ????
                            </Button>
                        </Col>
                    </Row>
                    <hr></hr>
                    <Row>
                        <h3>Degree Requirements</h3>
                        <DegreeRequirements
                            concentration={concentration}
                        ></DegreeRequirements>
                    </Row>
                    <hr></hr>
                    <h3>External Links:</h3>
                    <Row>
                        <Col>
                            <a href="https://udapps.nss.udel.edu/CoursesSearch/">
                                UD Course Search
                            </a>
                        </Col>
                        <Col>
                            <a href="https://catalog.udel.edu/preview_program.php?catoid=47&poid=34726&returnto=8860">
                                Detailed List of Requirements
                            </a>
                        </Col>
                        <Col>
                            <a href="https://www.cis.udel.edu/academics/undergraduate-programs/bscs/">
                                Concentrations Offered
                            </a>
                        </Col>
                        <Col>
                            <a href="https://www.cis.udel.edu/academics/undergraduate-programs/undergraduate-research/">
                                Research Opportunities
                            </a>
                        </Col>
                        <Col>
                            <a href="https://www.cis.udel.edu/academics/undergraduate-programs/resources/">
                                More Resources
                            </a>
                        </Col>
                    </Row>
                    <hr></hr>
                    <Row>
                        <div>
                            <b>Authors:</b> Henry Fidlow, Michael Savas, and
                            Jerel Okonski
                        </div>
                    </Row>
                </div>
                <div hidden={!planView}>
                    <div className="App-header2">
                        <Row>
                            <Col xs={5}>
                                <Button onClick={moveHome}>
                                    Move to Home ????
                                </Button>
                            </Col>
                            <Col xs={2}>
                                <h3>Degree Plans</h3>
                            </Col>
                            <Col xs={5}>
                                <Button onClick={moveCourseView}>
                                    Move to Course List ????
                                </Button>
                            </Col>
                        </Row>
                    </div>

                    <Row>
                        <DegreePlans
                            courses={courses}
                            concentration={concentration}
                            insertCourse={insertCourse}
                            saveCourses={saveData}
                            revertCourses={revert}
                        ></DegreePlans>
                    </Row>
                </div>
                <div hidden={!courseView}>
                    <div className="App-header2">
                        <Row>
                            <Col>
                                <Button onClick={moveHome}>
                                    Move to Home ????
                                </Button>
                            </Col>
                            <Col xs={6}>
                                <h3>Course List</h3>
                            </Col>
                            <Col>
                                <Button onClick={movePlanView}>
                                    Move to Degree Plans ????
                                </Button>
                            </Col>
                        </Row>
                    </div>

                    <div className="App-special2">
                        <Row className="justify-content-center">
                            <div className="App-break"></div>

                            <Col xs={2}></Col>
                            <Col xs={3}>
                                <Button
                                    onClick={saveData}
                                    style={{ margin: "5px 0px" }}
                                >
                                    <b>Save ????</b>
                                </Button>
                            </Col>

                            <div className="App-break"></div>
                        </Row>
                    </div>
                    <Row>
                        <CourseList
                            courses={courses}
                            editCourses={editCourses}
                        ></CourseList>
                    </Row>
                </div>
            </Stack>
        </div>
    );
}
