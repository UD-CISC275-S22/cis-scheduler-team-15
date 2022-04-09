import React from "react";
//import { Degree } from "../Interfaces/degree";
import { Row, Col } from "react-bootstrap";
//import { Stack, ToggleButton } from "react-bootstrap";
import "../App.css";

export function DegreeRequirements(): JSX.Element {
    return (
        <div>
            <Row>
                <Col>
                    <h3>University Requirements: </h3>
                    <ul>
                        <li>ENGL 110 - Seminar in Compostion</li>
                        <li>First Year Seminar (FYS)</li>
                        <li>Discovery Learning Experience (DLE)</li>
                        <li>Multicultural Requirement</li>
                        <li>Univertiy Breadth Requirements:</li>
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
                    </ul>
                    <a>Capstone Experience</a>
                </Col>
                <Col>
                    <h3>College Requirements:</h3>
                    <h6>Additional 25 Breadth Requirements:</h6>
                    <ul>
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
                        306 or CISC 304 require a C- in MATH 210.
                    </a>
                    <br></br>
                    <a>
                        No more than 45 credits can come from the same
                        department prefix
                    </a>
                    <ul>
                        <li>CISC 108 - Introduction to Computer Science I</li>
                        <li>CISC 181 - Introduction to Computer Science II</li>
                        <li>CISC 210 - Introduction to Systems Programming </li>
                        <li>CISC 220 - Data Structures </li>
                        <li>
                            CISC 260 - Machine Organization and Assembly
                            Language
                        </li>
                        <li>
                            15 credits of computer science tech electives 301 or
                            above expect:
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
            <h3>Electives:</h3>
            <a>
                After above has been completed any additional courses can be
                used to meet minimum number of credits.
            </a>
            <h3>Credits to Total a Minimum of 124</h3>
        </div>
    );
}
