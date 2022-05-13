import React from "react";
import { Row, Col, Container } from "react-bootstrap";

export function DegreeRequirementView({
    concentration
}: {
    concentration: string;
}): JSX.Element {
    return (
        <Container>
            <Row>
                <Col>
                    <h3>University Requirements: </h3>
                    <ul className="App-left-list">
                        <li>ENGL 110 - Seminar in Compostion</li>
                        <li>First Year Seminar (FYS)</li>
                        <li>Discovery Learning Experience (DLE)</li>
                        <li>Multicultural Requirement</li>
                        <li>University Breadth Requirements:</li>
                        <a>
                            {"   "}
                            <ul>
                                <li>Creative Arts and Humanities</li>
                                <li>History and Cultural Change</li>
                                <li>Social and Behavioral Sciences</li>
                                <li>
                                    Mathematics, Natural Sciences, and
                                    Technology
                                </li>
                            </ul>
                        </a>
                        <li>Capstone Experience</li>
                    </ul>
                </Col>
                <Col>
                    <h3>College Requirements:</h3>
                    <h6>Additional 25 Breadth Requirements:</h6>
                    <ul className="App-left-list">
                        <li>6 credits Creative Arts and Humanities</li>
                        <li>6 credits History and Cultural Change</li>
                        <li>6 credits Social and Behavioral Sciences</li>
                        <li>
                            7 credits Mathematics, Natural Sciences, and
                            Technology (one must contain a lab)
                        </li>
                    </ul>
                    <h6>Foreign Language:</h6>
                    <a>
                        Completion of a 107, 112, or 202 language course number
                        of credits (0-12) to be determined by high school study
                        and exemption examination more details linked below
                    </a>
                </Col>
                <Col>
                    <h3>Major Requirements:</h3>
                    <a>
                        CISC courses require a C-, Those who wish to take CISC
                        306 or CISC 304 require a C- in MATH 210
                    </a>
                    <br></br>
                    <a>
                        No more than 45 credits can come from the same
                        department prefix
                    </a>
                    <ul className="App-left-list">
                        <li>CISC 108 - Introduction to Computer Science I</li>
                        <li>CISC 181 - Introduction to Computer Science II</li>
                        <li>CISC 210 - Introduction to Systems Programming </li>
                        <li>CISC 220 - Data Structures </li>
                        <li>
                            CISC 260 - Machine Organization and Assembly
                            Language
                        </li>
                        <li>CISC 275 - Introduction to Software Engineering</li>
                        <li>
                            15 credits of computer science tech electives 301 or
                            above except:
                        </li>
                        <ul>
                            <li>
                                CISC 335, CISC 356, CISC 357, CISC 366, CISC
                                465, CISC 466, and any x67 must be approved
                            </li>
                        </ul>
                        <li>MATH 210 - Discrete Mathematics I</li>
                        <li>MATH 241 - Analytic Geometry and Calculus A</li>
                    </ul>
                </Col>
            </Row>
            <Row>
                <h3 hidden={concentration === "General (BA)"}>
                    {concentration.substring(0, concentration.length - 5)}{" "}
                    Requirements:
                </h3>
                <Col></Col>
                <Col>
                    <div
                        hidden={
                            concentration !==
                            "Artificial Intelligence and Robotics (BS)"
                        }
                    >
                        <ul className="App-left-list">
                            <li>AI</li>
                        </ul>
                    </div>
                    <div hidden={concentration !== "Bioinformtics (BS)"}>
                        <ul className="App-left-list">
                            <li>Bio</li>
                        </ul>
                    </div>
                    <div hidden={concentration !== "Cybersecurity (BS)"}>
                        <ul className="App-left-list">
                            <li>Cyber</li>
                        </ul>
                    </div>
                    <div hidden={concentration !== "Data Science (BS)"}>
                        <ul className="App-left-list">
                            <li>Data</li>
                        </ul>
                    </div>
                    <div
                        hidden={
                            concentration !== "High Performance Computing (BS)"
                        }
                    >
                        <ul className="App-left-list">
                            <li>Perf</li>
                        </ul>
                    </div>
                    <div hidden={concentration !== "Systems and Networks (BS)"}>
                        <ul className="App-left-list">
                            <li>System</li>
                        </ul>
                    </div>
                    <div
                        hidden={concentration !== "Theory and Computation (BS)"}
                    >
                        <ul className="App-left-list">
                            <li>Theory</li>
                        </ul>
                    </div>
                </Col>
                <Col></Col>
            </Row>
            <h3>Electives:</h3>
            <a>
                After above has been completed any additional courses used to
                meet minimum number of credits.
            </a>
            <h3>Credits to Total a Minimum of 124</h3>
        </Container>
    );
}
