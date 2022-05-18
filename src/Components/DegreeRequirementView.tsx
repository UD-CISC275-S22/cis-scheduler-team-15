import React from "react";
import { Row, Col, Container } from "react-bootstrap";

/* Contains the information for all of the degree requirements for 
all of the different CS concentrations */

export function DegreeRequirementView({
    concentration
}: {
    concentration: string;
}): JSX.Element {
    return (
        <Container>
            <br></br>
            <Row>
                <Col className="border border-dark">
                    <h4>University Requirements: </h4>
                    <ul className="App-left-list">
                        <li>ENGL 110 - Seminar in Compostion</li>
                        <li>First Year Seminar (FYS)</li>
                        <li>Discovery Learning Experience (DLE)</li>
                        <li>Multicultural Requirement</li>
                        <li>University Breadth Requirements:</li>
                        <a>
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
                        <a>
                            <ul>
                                <li>Option 1: CISC 498 and CISC 499</li>
                                <li>Option 2: UNIV 401 and UNIV402</li>
                            </ul>
                        </a>
                        <li hidden={concentration !== "General (BA)"}>
                            Second Writing Requirement (SWR)
                        </li>
                    </ul>
                </Col>
                <Col className="border border-dark">
                    <h4>College Requirements:</h4>
                    <div hidden={concentration !== "General (BA)"}>
                        <h6>Additional 25 Breadth Requirements</h6>
                        <div className="App-left-list">
                            <li>6 credits Creative Arts and Humanities</li>
                            <li>6 credits History and Cultural Change</li>
                            <li>6 credits Social and Behavioral Sciences</li>
                            <li>
                                7 credits Mathematics, Natural Sciences, and
                                Technology (one must contain a lab)
                            </li>
                        </div>

                        <h6>Foreign Language</h6>
                        <li className="App-left-list">
                            Completion of a 107, 112, or 202 language course
                            number of credits (0-12) to be determined by high
                            school study and exemption examination more details
                            linked below
                        </li>
                    </div>

                    <h6 hidden={concentration === "General (BA)"}></h6>
                    <div hidden={concentration === "General (BA)"}>
                        <h6>21 Breadth Requirements Total</h6>
                        <ul className="App-left-list">
                            <li>
                                6 credits of upper level breadth (any 300+ level
                                course excluding Math, Natural Sciences and
                                Technology courses)
                            </li>
                            <li>
                                Second Writing Requirement (SWR) (pick one):
                            </li>
                            <div>
                                <ul>
                                    <li>
                                        ENGL312 - Written Communications in
                                        Business
                                    </li>
                                    <li>ENGL410 - Technical Writing</li>
                                </ul>
                            </div>
                        </ul>
                    </div>
                </Col>
                <Col className="border border-dark">
                    <h4>Major Requirements:</h4>
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
                        <div hidden={concentration !== "General (BA)"}>
                            <li>
                                15 credits of computer science tech electives
                                301 or above except:
                            </li>
                            <ul>
                                <li>
                                    CISC 335, CISC 356, CISC 357, CISC 366, CISC
                                    465, CISC 466, and any x67 must be approved
                                </li>
                            </ul>
                        </div>
                        <div hidden={concentration === "General (BA)"}>
                            <li>CISC 303 - Automata Theory</li>
                            <li>CISC 320 - Introduction to Algorithms</li>
                            <li>CISC 355 - Computers, Ethics and Society</li>
                        </div>
                        <li>MATH 210 - Discrete Mathematics I</li>
                        <li>MATH 241 - Analytic Geometry and Calculus A</li>
                        <div hidden={concentration === "General (BA)"}>
                            <li>8 credits of Lab Science</li>
                            <ul>
                                <li>Option 1: BISC207 and BISC208</li>
                                <li>
                                    Option 2: CHEM103, CHEM133, CHEM104, and
                                    CHEM134
                                </li>
                                <li>
                                    Option 3: PHYS207, PHYS227, PHYS208, and
                                    PHYS228
                                </li>
                            </ul>
                        </div>
                    </ul>
                </Col>
            </Row>
            <Row className="border border-dark">
                <h4 hidden={concentration === "General (BA)"}>
                    {concentration.substring(0, concentration.length - 5)}{" "}
                    Requirements:
                </h4>
                <Col></Col>
                <Col>
                    <div
                        hidden={
                            concentration !==
                            "Artificial Intelligence and Robotics (BS)"
                        }
                    >
                        <h6>Concentration Requirements</h6>
                        <ul className="App-left-list">
                            <li>CISC 304 - Logic for Programming</li>
                            <li>CISC 442 - Introduction to Computer Vision</li>
                            <li>CISC 481 - Artificial Intelligence</li>
                            <li>CISC 483 - Introduction to Data Mining</li>
                            <li>CISC 484 - Introduction to Machine Learning</li>
                            <li>
                                12 credits from restricted electives found{" "}
                                <a href="https://catalog.udel.edu/preview_program.php?catoid=47&poid=34982">
                                    here
                                </a>
                            </li>
                        </ul>
                        <h6>Probability/Statistics Requirement</h6>
                        <div>
                            <b>Pick one of the following:</b>
                        </div>
                        <ul className="App-left-list">
                            <li>MATH 205 - Statistical Methods</li>
                            <li>
                                MATH 350 - Probability Theory and Simulation
                                Methods
                            </li>
                        </ul>
                        <h6>Systems Requirement</h6>
                        <div>
                            <b>Pick one of the following:</b>
                        </div>
                        <ul className="App-left-list">
                            <li>CISC 361 - Operating Systems</li>
                            <li>CISC 372 - Parallel Computing</li>
                        </ul>
                    </div>
                    <div hidden={concentration !== "Bioinformatics (BS)"}>
                        <h6>Concentration Requirements</h6>
                        <ul className="App-left-list">
                            <li>BISC 207 - Introductory Biology I</li>
                            <li>BISC 208 - Introductory Biology II</li>
                            <li>BISC 401 - Molecular Biology of the Cell</li>
                            <li>CHEM 103 - General Chemistry</li>
                            <li>CHEM 133 - General Chemistry Laboratory</li>
                            <li>CHEM 104 - General Chemistry</li>
                            <li>CHEM 134 - General Chemistry Laboratory</li>
                            <li>CISC 372 - Parallel Computing</li>
                            <li>
                                CISC 436 - Computational Biology and
                                Bioinformatics
                            </li>
                            <li>MATH 242 - Analytic Geometry and Calculus B</li>
                            <li>MATH 349 - Elementary Linear Algebra</li>
                            <li>
                                6 credits from restricted electives found{" "}
                                <a href="https://catalog.udel.edu/preview_program.php?catoid=47&poid=34983">
                                    here
                                </a>
                            </li>
                        </ul>
                        <h6>Organic Chemistry Sequence</h6>
                        <ul className="App-left-list">
                            <li>Option 1: CHEM213 and CHEM215</li>
                            <li>Option 2: CHEM321 and CHEM325</li>
                        </ul>
                        <h6>Probability/Statistics Requirement</h6>
                        <div>
                            <b>Pick one of the following:</b>
                        </div>
                        <ul className="App-left-list">
                            <li>MATH 205 - Statistical Methods</li>
                            <li>
                                MATH 350 - Probability Theory and Simulation
                                Methods
                            </li>
                        </ul>
                        <h6>Data Analysis Requirement</h6>
                        <div>
                            <b>Pick one of the following:</b>
                        </div>
                        <ul className="App-left-list">
                            <li>CISC483 - Introduction to Data Mining</li>
                            <li>CISC484 - Introduction to Machine Learning</li>
                        </ul>
                    </div>
                    <div hidden={concentration !== "Cybersecurity (BS)"}>
                        <h6>Concentration Requirements</h6>
                        <ul className="App-left-list">
                            <li>CISC 361 - Operating Systems</li>
                            <li>CISC 372 - Parallel Computing</li>
                            <li>CISC 450 - Computer Networks I</li>
                            <li>CISC 464 - Introduction to Network Security</li>
                            <li>CPEG 465 - Introduction to Cybersecurity</li>
                            <li>CPEG 494 - System Hardening and Protection</li>
                            <li>
                                6 credits from restricted electives found{" "}
                                <a href="https://catalog.udel.edu/preview_program.php?catoid=47&poid=34981">
                                    here
                                </a>
                            </li>
                        </ul>
                        <h6>Probability/Statistics Requirement</h6>
                        <div>
                            <b>Pick one of the following:</b>
                        </div>
                        <ul className="App-left-list">
                            <li>MATH 205 - Statistical Methods</li>
                            <li>
                                MATH 350 - Probability Theory and Simulation
                                Methods
                            </li>
                        </ul>
                        <h6>Advanced Cybersecurity Requirement</h6>
                        <div>
                            <b>Pick two of the following:</b>
                        </div>
                        <ul className="App-left-list">
                            <li>CPEG 472 - Applied Cryptography</li>
                            <li>CPEG 473 - Cloud Computing and Security</li>
                            <li>
                                CPEG 475 - IoT and Embedded Systems Security
                            </li>
                            <li>CPEG 476 - Secure Software Design</li>
                            <li>CPEG 495 - Digital Forensics</li>
                        </ul>
                    </div>
                    <div hidden={concentration !== "Data Science (BS)"}>
                        <h6>Concentration Requirements</h6>
                        <ul className="App-left-list">
                            <li>CISC 304 - Logic for Programming</li>
                            <li>CISC 372 - Parallel Computing</li>
                            <li>CISC 437 - Database Systems</li>
                            <li>CISC 481 - Artificial Intelligence</li>
                            <li>MATH 205 - Statistical Methods</li>
                            <li>MATH 242 - Analytic Geometry and Calculus B</li>
                            <li>MATH 243 - Analytic Geometry and Calculus C</li>
                            <li>MATH 349 - Elementary Linear Algebra</li>
                            <li>
                                3 credits from restricted electives found{" "}
                                <a href="https://catalog.udel.edu/preview_program.php?catoid=47&poid=34980">
                                    here
                                </a>
                            </li>
                        </ul>
                        <h6>Data Analysis Requirement</h6>
                        <div>
                            <b>Pick one of the following:</b>
                        </div>
                        <ul className="App-left-list">
                            <li>CISC483 - Introduction to Data Mining</li>
                            <li>CISC484 - Introduction to Machine Learning</li>
                        </ul>
                        <h6>Advanced Math Requirement</h6>
                        <div>
                            <b>Pick one of the following:</b>
                        </div>
                        <ul className="App-left-list">
                            <li>MATH 302 - Ordinary Differential Equations</li>
                            <li>
                                MATH 350 - Probability Theory and Simulation
                                Methods
                            </li>
                            <li>MATH 426 - Computational Mathematics I</li>
                        </ul>
                    </div>
                    <div
                        hidden={
                            concentration !== "High Performance Computing (BS)"
                        }
                    >
                        <h6>Concentration Requirements</h6>
                        <ul className="App-left-list">
                            <li>CISC 360 - Computer Architecture</li>
                            <li>CISC 361 - Operating Systems</li>
                            <li>CISC 372 - Parallel Computing</li>
                            <li>CISC 450 - Computer Networks I</li>
                            <li>CISC 471 - Compiler Design</li>
                            <li>MATH 242 - Analytic Geometry and Calculus B</li>
                            <li>MATH 243 - Analytic Geometry and Calculus C</li>
                        </ul>
                        <div className="border border-dark">
                            {" "}
                            <u>
                                <b>Applied Math Track</b>
                            </u>
                            <ul className="App-left-list">
                                <li>MATH 351 - Engineering Mathematics I</li>
                                <li>MATH 428 - Computational Mathematics II</li>
                                <li>5 credits from the following:</li>
                                <ul>
                                    <li>Any 300+ level CISC course</li>
                                    <li>MATH 205 - Statistical Methods</li>
                                    <li>
                                        MATH 350 - Probability Theory and
                                        Simulation Methods
                                    </li>
                                </ul>
                            </ul>
                            <h6>Probability/Statistics Requirement</h6>
                            <div>
                                <b>Pick one of the following:</b>
                            </div>
                            <ul className="App-left-list">
                                <li>MATH 205 - Statistical Methods</li>
                                <li>
                                    MATH 350 - Probability Theory and Simulation
                                    Methods
                                </li>
                            </ul>
                        </div>
                        <div className="border border-dark">
                            <u>
                                <b>Data Track</b>
                            </u>
                            <ul className="App-left-list">
                                <li>CISC 437 - Database Systems</li>
                                <li>
                                    MATH 350 - Probability Theory and Simulation
                                    Methods
                                </li>
                                <li>MATH 450 - Mathematical Statistics</li>
                                <li>5 credits from the following:</li>
                                <ul>
                                    <li>Any 300+ level CISC course</li>
                                    <li>
                                        MATH 302 - Ordinary Differential
                                        Equations
                                    </li>
                                    <li>
                                        MATH 349 - Elementary Linear Algebra
                                    </li>
                                    <li>
                                        MATH 351 - Engineering Mathematics I
                                    </li>
                                    <li>
                                        MATH 535 - Introduction to Partial
                                        Differential Equations
                                    </li>
                                </ul>
                            </ul>
                            <h6>Data Analysis Requirement</h6>
                            <div>
                                <b>Pick one of the following:</b>
                            </div>
                            <ul className="App-left-list">
                                <li>CISC483 - Introduction to Data Mining</li>
                                <li>
                                    CISC484 - Introduction to Machine Learning
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div hidden={concentration !== "Systems and Networks (BS)"}>
                        <h6>Concentration Requirements</h6>
                        <ul className="App-left-list">
                            <li>CISC 360 - Computer Architecture</li>
                            <li>CISC 361 - Operating Systems</li>
                            <li>CISC 372 - Parallel Computing</li>
                            <li>CISC 450 - Computer Networks I</li>
                            <li>CISC 471 - Compiler Design</li>
                            <li>
                                6 credits from restricted electives found{" "}
                                <a href="https://catalog.udel.edu/preview_program.php?catoid=47&poid=34985">
                                    here
                                </a>
                            </li>
                        </ul>
                        <h6>Probability/Statistics Requirement</h6>
                        <div>
                            <b>Pick one of the following:</b>
                        </div>
                        <ul className="App-left-list">
                            <li>MATH 205 - Statistical Methods</li>
                            <li>
                                MATH 350 - Probability Theory and Simulation
                                Methods
                            </li>
                        </ul>
                        <h6>Security Requirement</h6>
                        <div>
                            <b>Pick one of the following:</b>
                        </div>
                        <ul className="App-left-list">
                            <li>CISC 464 - Introduction to Network Security</li>
                            <li>CPEG 465 - Introduction to Cybersecurity</li>
                            <li>CPEG 470 - Web Applications Security</li>
                            <li>CPEG 476 - Secure Software Design</li>
                            <li>CPEG 473 - Cloud Computing and Security</li>
                            <li>
                                CPEG 475 - IoT and Embedded Systems Security
                            </li>
                            <li>CPEG 497 - Advanced Cybersecurity</li>
                        </ul>
                        <h6>Advanced Systems Requirement</h6>
                        <div>
                            <b>Pick two of the following:</b>
                        </div>
                        <ul className="App-left-list">
                            <li>CISC 437 - Database Systems </li>
                            <li>CISC 453 - Simulation of Computer Networks</li>
                            <li>
                                CISC 459 - Topics in Communications, Distributed
                                Computing and Networks
                            </li>
                            <li>CISC 464 - Introduction to Network Security</li>
                            <li>CISC 474 - Advanced Web Technologies</li>
                            <li>CISC 475 - Advanced Software Engineering</li>
                            <li>
                                CISC 479 - Topics in Architecture and Software
                            </li>
                            <li>CPEG 473 - Cloud Computing and Security</li>
                            <li>CPEG 497 - Advanced Cybersecurity</li>
                        </ul>
                    </div>
                    <div
                        hidden={concentration !== "Theory and Computation (BS)"}
                    >
                        <h6>Concentration Requirements</h6>
                        <ul className="App-left-list">
                            <li>CISC 304 - Logic for Programming</li>
                            <li>
                                CISC 401 - Elements of the Theory of Computation
                            </li>
                            <li>MATH 242 - Analytic Geometry and Calculus B</li>
                            <li>MATH 349 - Elementary Linear Algebra</li>
                            <li>
                                6 credits from restricted electives found{" "}
                                <a href="https://catalog.udel.edu/preview_program.php?catoid=47&poid=34979">
                                    here
                                </a>
                            </li>
                        </ul>
                        <h6>Probability/Statistics Requirement</h6>
                        <div>
                            <b>Pick one of the following:</b>
                        </div>
                        <ul className="App-left-list">
                            <li>MATH 205 - Statistical Methods</li>
                            <li>
                                MATH 350 - Probability Theory and Simulation
                                Methods
                            </li>
                        </ul>
                        <div className="border border-dark">
                            <u>
                                <b>Discrete Track</b>
                            </u>
                            <ul className="App-left-list">
                                <li>CISC 404 - Logic in Computer Science</li>
                                <li>MATH 245 - An Introduction to Proof</li>
                                <li>MATH 315 - Discrete Mathematics II</li>
                                <li>MATH 451 - Abstract Algebra I</li>
                            </ul>
                        </div>
                        <div className="border border-dark">
                            <u>
                                <b>Continuous Track</b>
                            </u>
                            <ul className="App-left-list">
                                <li>
                                    MATH 243 - Analytic Geometry and Calculus C
                                </li>
                                <li>
                                    MATH 302 - Ordinary Differential Equations
                                </li>
                                <li>
                                    MATH 535 - Introduction to Partial
                                    Differential Equations
                                </li>
                                <li>MATH 426 - Computational Mathematics I</li>
                            </ul>
                        </div>
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
