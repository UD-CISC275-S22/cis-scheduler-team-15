import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Degree } from "../Interfaces/degree";
import { Semester } from "../Interfaces/semester";

export function AddSemester({
    degree,
    editDegree,
    editMode
}: {
    degree: Degree;
    editDegree: (degreeID: number, newDegree: Degree) => void;
    editMode: boolean;
}): JSX.Element {
    const [modal, setModal] = useState<boolean>(false);
    const [season, setSeason] = useState<string>("Fall");
    const [year, setYear] = useState<number>(2022);
    const [popup, setPopup] = useState<boolean>(false);

    function updateSeason(event: React.ChangeEvent<HTMLSelectElement>) {
        setPopup(false);
        setSeason(event.target.value);
    }

    function updateYear(event: React.ChangeEvent<HTMLSelectElement>) {
        setPopup(false);
        setYear(parseInt(event.target.value));
    }

    function newSemester() {
        const IDList = degree.semesters.map(
            (semester: Semester) => semester.semesterID
        );
        const newID = IDList.length > 0 ? Math.max(...IDList) + 1 : 1;
        const newSem: Semester = {
            semesterID: newID,
            season: season,
            year: year,
            courses: []
        };
        const sameSemesters = degree.semesters.filter(
            (semester: Semester): boolean =>
                semester.season === season && semester.year === year
        );
        if (sameSemesters.length === 0) {
            editDegree(degree.degreeID, {
                ...degree,
                semesters: [...degree.semesters, newSem]
            });
        } else {
            setPopup(true);
        }
    }

    return (
        <span hidden={!editMode}>
            <Button
                data-bs-toggle="modal"
                data-toggle="tooltip"
                onClick={() => setModal(true)}
            >
                Add Semester
            </Button>
            <Modal show={modal} onHide={() => setModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div>Add Semester</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>
                        <Form.Group controlId="season">
                            <Form.Label>Choose Season</Form.Label>
                            <Form.Select value={season} onChange={updateSeason}>
                                <option value="Fall">Fall</option>
                                <option value="Winter">Winter</option>
                                <option value="Spring">Spring</option>
                                <option value="Summer">Summer</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="year">
                            <Form.Label>Choose Year</Form.Label>
                            <Form.Select value={year} onChange={updateYear}>
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                                <option value="2030">2030</option>
                            </Form.Select>
                        </Form.Group>
                    </span>
                    <br></br>
                    <div>
                        <Button onClick={newSemester}>Create Semester</Button>
                    </div>
                    <div hidden={!popup}>
                        <b>Error:</b> Cannot add semester because {season}{" "}
                        {year} already exists within this Degree Plan. Please
                        enter a different Semester.
                    </div>
                </Modal.Body>
            </Modal>
        </span>
    );
}
