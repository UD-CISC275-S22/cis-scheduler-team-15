import React from "react";
import { Row, Col } from "react-bootstrap";
//import { DegreePlans } from "./Components/degree_plans";
//import PlanData from "./Data/plan_data.json";
//import CourseList from "./Data/course_list.json";
//import { Degree } from "./Interfaces/degree";
import "./App.css";

//const degrees = PlanData.map((degree): Degree => degree as Degree);

function App(): JSX.Element {
    return (
        <div className="App">
            <div className="App-header">
                <h1>UD CISC275 with React Hooks and TypeScript</h1>
                <h2>Authors:</h2>
                <p>
                    <div>Henry Fidlow</div>
                    <div>Michael Savas</div>
                    <div>Jerel Okonski</div>
                </p>
            </div>
            <div>
                <div className="App-special">
                    <h1>UD Degree Plan Tester</h1>
                    <img
                        src="https://clipartix.com/wp-content/uploads/2016/04/Paper-clip-art-free-free-clipart-images-clipartcow.png"
                        width="100"
                        height="100"
                    />
                </div>
            </div>
            <h3>Instructions:</h3>
            <div className="App-thin">
                This application is developed with the intent of helping
                University of Delaware Computer Science (CISC) majors determine
                the degree plan best suited to their interests, while still
                meeting degree requirements. To navigate this page, select an
                existing or new degree plan. Within the plan you can edit and
                view the semesters and classes you would like. When you are
                satisfied with the plan, you can check to see if all the degree
                requirements have been met. A list of commonly offered CISC
                courses has been provided. For further information on available
                breadth and technical elective courses, you can refer to the
                following links. Best of luck in navigating your future!
            </div>
            <hr></hr>
            <h3>Degree Plans:</h3>
            <hr></hr>
            <h3>
                Degree Requirements: [Add Show/Hide Component with list of
                requirements]
            </h3>
            <hr></hr>
            <h3>
                Course List: [Add show/Hide Component with list of existing
                courses]
            </h3>
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
        </div>
    );
}

export default App;
