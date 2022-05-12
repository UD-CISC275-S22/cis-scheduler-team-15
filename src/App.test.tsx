import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
//import ReactDOM from "react-dom";

describe("Final Project Tests (App)", () => {
    beforeEach(() => {
        render(<App />);
    });

    test("Insert and Remove a degree plan", () => {
        const openPlanPage = screen.getByRole("button", {
            name: /Move to Degree Plans 📖/i
        });
        openPlanPage.click();
        const addEmpty = screen.getByRole("button", {
            name: /Add Empty ➕/i
        });
        const addDefault = screen.getByRole("button", {
            name: /Add Default \(8 semesters\) ➕/i
        });
        let defaults = screen.queryAllByRole("button", {
            name: "Default"
        });
        let firstEmpty = screen.queryByRole("button", {
            name: "Empty"
        });
        expect(defaults[0]).not.toBeNull();
        expect(defaults[1]).toBeUndefined();
        expect(firstEmpty).toBeNull();
        addDefault.click();
        addEmpty.click();
        defaults = screen.queryAllByRole("button", {
            name: "Default"
        });
        firstEmpty = screen.queryByRole("button", {
            name: "Empty"
        });
        expect(defaults[0]).not.toBeUndefined();
        expect(defaults[1]).not.toBeUndefined();
        expect(firstEmpty).not.toBeNull();
        if (defaults[0] !== null) {
            defaults[0].click();
        }
        let deletePlan = screen.queryByRole("button", {
            name: /Delete Plan 🗑️/i
        });
        deletePlan?.click();
        if (firstEmpty !== null) {
            firstEmpty.click();
        }
        deletePlan = screen.queryByRole("button", {
            name: /Delete Plan 🗑️/i
        });
        deletePlan?.click();
        defaults = screen.queryAllByRole("button", {
            name: "Default"
        });
        firstEmpty = screen.queryByRole("button", {
            name: "Empty"
        });
        expect(defaults[0]).not.toBeUndefined();
        expect(defaults[1]).toBeUndefined();
        expect(firstEmpty).toBeNull();
    });
    test("Students can see a list of degree requirements", () => {
        let text1 = screen.queryByText("University Requirements:");
        let text2 = screen.queryByText("College Requirements:");
        let text3 = screen.queryByText("Major Requirements:");
        let text4 = screen.queryByText("Credits to Total a Minimum of 124");
        expect(text1).toBeNull();
        expect(text2).toBeNull();
        expect(text3).toBeNull();
        expect(text4).toBeNull();
        const showHides = screen.getAllByRole("button", {
            name: /Show/i
        });
        showHides[0].click();
        text1 = screen.queryByText("University Requirements:");
        text2 = screen.queryByText("College Requirements:");
        text3 = screen.queryByText("Major Requirements:");
        text4 = screen.queryByText("Credits to Total a Minimum of 124");
        expect(text1).toBeVisible();
        expect(text2).toBeVisible();
        expect(text3).toBeVisible();
        expect(text4).toBeVisible();
    });

    test("Students can see a list of existing courses", () => {
        const openCourses = screen.getByRole("button", {
            name: "Move to Course List 📄"
        });
        openCourses.click();
        const text1 = screen.queryByText(
            "CISC108: Introduction to Computer Science I"
        );
        const text2 = screen.queryByText(
            "CISC181: Introduction to Computer Science II"
        );
        const text3 = screen.queryByText("MATH210: Discrete Mathematics I");
        const text4 = screen.queryByText(
            "CISC499: Computer Science Senior Design Project II (Capstone)"
        );
        expect(text1).not.toBeNull();
        expect(text2).not.toBeNull();
        expect(text3).not.toBeNull();
        expect(text4).not.toBeNull();
    });

    test("Students will get an error in the semester view when a course with an unsatisfied prerequisite or corequisite is added", () => {
        const openPlanPage = screen.getByRole("button", {
            name: /Move to Degree Plans 📖/i
        });
        openPlanPage.click();
        const addEmpty = screen.getByRole("button", {
            name: /Add Empty ➕/i
        });
        addEmpty.click();
        const firstEmpty = screen.queryByRole("button", {
            name: "Empty"
        });
        firstEmpty?.click();
        const editButton = screen.queryByRole("button", {
            name: /Edit Plan 🖉/i
        });
        editButton?.click();
        const addSemester = screen.queryByRole("button", {
            name: /Add Semester ➕/i
        });
        addSemester?.click();
        const createSemester = screen.queryByRole("button", {
            name: /Create Semester/i
        });
        createSemester?.click();
        const closeModal = screen.queryByRole("closebutton");
        closeModal?.click();
        const editSemester = screen.getAllByRole("button", {
            name: "🖉"
        })[0];
        editSemester.click();
        const addCourse = screen.getByRole("button", {
            name: /Add Course/i
        });
        addCourse.click();
        const filter = screen.getAllByRole("textbox");
        userEvent.type(filter[3], "181"); /*
        let prereqMessage = screen.queryAllByText("CISC108");
        let coreqMessage = screen.queryByText(
            "Unsatisfied corequisite(s): MATH241"
        );
        expect(prereqMessage).toBeNull();
       expect(coreqMessage).toBeNull();
        
        const adding = screen.getByRole("button", {
            name: "Click to add 2"
        });
        adding.click();
        prereqMessage = screen.getAllByText(/CISC108/i);

        coreqMessage = screen.queryByText(
            "Unsatisfied corequisite(s): MATH241"
        );
        expect(prereqMessage.length).toBe(1); 
        //expect(coreqMessage).toBeVisible();*/
    });
    /*
    test("Students can clear out semesters in a plan", () => {});

    */

    //Mike's Tests
    /*
    test("Students can establish that a course fulfills a degree requirement", () => {
        const infoButtons = screen.queryAllByRole("button", {
            name: / i/i
        });

        infoButtons[0].click();
        const editButton = screen.getAllByRole("button", {
            name: /Edit/i
        });
        editButton[0].click();

        
        const uAccordian = screen.queryByTestId("edit-univ-req-accordian");
        uAccordian?.click();
        expect(COURSES[0].reqsSatisfied.includes("CISC108"));
        const uOptions = screen.queryAllByTestId("edit-univ-req-option");
        uOptions[0].click();
        expect(COURSES[0].reqsSatisfied.includes("FYS"));
        uOptions[0].click();
        expect(!COURSES[0].reqsSatisfied.includes("FYS"));

        const cAccordian = screen.queryByTestId("edit-coll-req-accordian");
        cAccordian?.click();
        expect(COURSES[0].reqsSatisfied.includes("CISC108"));
        const cOptions = screen.queryAllByTestId("edit-coll-req-option");
        cOptions[0].click();
        expect(COURSES[0].reqsSatisfied.includes("FL"));
        cOptions[0].click();
        expect(!COURSES[0].reqsSatisfied.includes("FL"));

        const mAccordian = screen.queryByTestId("edit-major-req-accordian");
        mAccordian?.click();
        expect(COURSES[0].reqsSatisfied.includes("CISC108"));
        const mOptions = screen.queryAllByTestId("edit-major-req-option");
        mOptions[0].click();
        expect(!COURSES[0].reqsSatisfied.includes("CISC108"));
        mOptions[0].click();
        expect(COURSES[0].reqsSatisfied.includes("CISC108"));
        mOptions[1].click();
        expect(COURSES[0].reqsSatisfied.includes("CISC181"));
        mOptions[1].click();
        expect(!COURSES[0].reqsSatisfied.includes("CISC181"));
        
    });

    test("Update courses in existing degree plans when course list is updated", () => {
        const addDefault = screen.getByRole("button", {
            name: /Add Default \(8 semesters\) ➕/i
        });
        addDefault.click();
        const plans = screen.getAllByRole("button", {
            name: /1: Default/i
        });
        plans[0].click();

        const infoButtons = screen.queryAllByTestId("info-button");
        infoButtons[0].click();

        const text1 = screen.queryAllByText(
            "CISC108: Introduction to Computer Science I"
        );
        expect(text1[0]).toBeVisible();

        const editButton = screen.queryAllByTestId("edit-button");
        editButton[0].click();
        const titleBox = screen.getByTestId("edit-title");
        userEvent.clear(titleBox);
        userEvent.type(titleBox, "Intro to Computers");
        const titleButton = screen.getByRole("button", {
            name: /Update Title/i
        });
        titleButton.click();
        const newTitle = screen.queryAllByText("CISC108: Intro to Computers");
        expect(newTitle.length).toBe(2);
    });
*/
    /*
    test("Students can establish that a course meets another course's prerequisite and not add an already prerequisite", () => {
        const showHides = screen.getAllByRole("button", {
            name: /Show/i
        });
        showHides[1].click();

        const infoButtons = screen.queryAllByRole("button", {
            name: / i/i
        });

        infoButtons[0].click();
        const editButton = screen.getAllByRole("button", {
            name: /Edit/i
        });
        editButton[0].click();

        expect(courseInput[0].preReqs.length === 0);
        const preReqOptions = screen.getAllByTestId("add-preReq");
        const preReqBox = screen.getAllByRole("combobox");
        userEvent.selectOptions(preReqBox[0], preReqOptions[1]);
        const addPreReqButton = screen.getByRole("button", {
            name: /Add PreReq/i
        });
        addPreReqButton.click();

        const hideButton = screen.getAllByRole("button", {
            name: /Hide/i
        });
        hideButton[0].click();

        expect(COURSES[0].preReqs.length).toBe(1);
        expect(COURSES[0].preReqs[0]).toBe(1);

        hideButton[0].click();
        addPreReqButton.click();
        expect(COURSES[0].preReqs.length).toBe(1);
    });

    test("Students can remove a course as a course's prerequisite and not remove non-existent prerequisite", () => {
        const showHides = screen.getAllByRole("button", {
            name: /Show/i
        });
        showHides[1].click();

        const infoButtons = screen.queryAllByRole("button", {
            name: / i/i
        });

        infoButtons[0].click();
        const editButton = screen.getAllByRole("button", {
            name: /Edit/i
        });
        editButton[0].click();

        expect(COURSES[0].preReqs.length).toBe(0);
        const preReqOptionsRem = screen.getAllByTestId("remove-preReq");
        const preReqBox = screen.getAllByRole("combobox");
        userEvent.selectOptions(preReqBox[1], preReqOptionsRem[1]);
        const removePreReqButton = screen.getByRole("button", {
            name: /Remove PreReq/i
        });
        const addPreReqButton = screen.getByRole("button", {
            name: /Add PreReq/i
        });

        removePreReqButton.click();
        expect(COURSES[0].preReqs.length).toBe(0);

        const preReqOptionsAdd = screen.getAllByTestId("add-preReq");
        userEvent.selectOptions(preReqBox[0], preReqOptionsAdd[1]);
        addPreReqButton.click();

        expect(COURSES[0].preReqs.length).toBe(1);
        expect(COURSES[0].preReqs[0]).toBe(1);
        removePreReqButton.click();
        expect(COURSES[0].preReqs.length).toBe(0);
    });

    test("Students can establish that a course meets another course's corequisite and not add an already corequisite", () => {
        const showHides = screen.getAllByRole("button", {
            name: /Show/i
        });
        showHides[1].click();

        const infoButtons = screen.queryAllByRole("button", {
            name: / i/i
        });

        infoButtons[0].click();
        const editButton = screen.getAllByRole("button", {
            name: /Edit/i
        });
        editButton[0].click();

        expect(COURSES[0].coReqs.length).toBe(1);
        expect(COURSES[0].coReqs[0]).toBe(13);
        const coReqOptions = screen.getAllByTestId("add-coReq");
        const coReqBox = screen.getAllByRole("combobox");
        userEvent.selectOptions(coReqBox[2], coReqOptions[1]);
        const addPreReqButton = screen.getByRole("button", {
            name: /Add CoReq/i
        });
        addPreReqButton.click();

        const hideButton = screen.getAllByRole("button", {
            name: /Hide/i
        });
        hideButton[0].click();

        expect(COURSES[0].preReqs.length).toBe(2);
        expect(COURSES[0].preReqs[0]).toBe(13);
        expect(COURSES[0].preReqs[1]).toBe(1);

        hideButton[0].click();
        addPreReqButton.click();
        expect(COURSES[0].preReqs.length).toBe(2);
    });

    test("Students can remove a course as a course's corequisite and not remove non-existent corequisite", () => {
        const showHides = screen.getAllByRole("button", {
            name: /Show/i
        });
        showHides[1].click();

        const infoButtons = screen.queryAllByRole("button", {
            name: / i/i
        });

        infoButtons[0].click();
        const editButton = screen.getAllByRole("button", {
            name: /Edit/i
        });
        editButton[0].click();

        expect(COURSES[0].coReqs.length).toBe(1);
        const coReqOptionsRem = screen.getAllByTestId("remove-coReq");
        const coReqBox = screen.getAllByRole("combobox");
        userEvent.selectOptions(coReqBox[3], coReqOptionsRem[1]);
        const removeCoReqButton = screen.getByRole("button", {
            name: /Remove CoReq/i
        });
        const addCoReqButton = screen.getByRole("button", {
            name: /Add CoReq/i
        });

        removeCoReqButton.click();
        expect(COURSES[0].coReqs.length).toBe(1);

        const coReqOptionsAdd = screen.getAllByTestId("add-coReq");
        userEvent.selectOptions(coReqBox[2], coReqOptionsAdd[1]);
        addCoReqButton.click();

        expect(COURSES[0].coReqs.length).toBe(2);
        expect(COURSES[0].coReqs[0]).toBe(13);
        expect(COURSES[0].coReqs[1]).toBe(1);
        removeCoReqButton.click();
        expect(COURSES[0].coReqs.length).toBe(1);
        expect(COURSES[0].coReqs[0]).toBe(13);
    });

    //test("Students can reset course's info back to default", () => {});
    */
    /*
    test("Students can see a list of existing courses", () => {
        const showHides = screen.getAllByRole("button", {
            name: /Show/i
        });
        showHides[1].click();

        const infoButtons = screen.queryAllByRole("button", {
            name: / i/i
        });
        expect(infoButtons.length).toBe(45);
    });

    test("Students can edit the course code", () => {
        const showHides = screen.getAllByRole("button", {
            name: /Show/i
        });
        showHides[1].click();

        const infoButtons = screen.queryAllByTestId("info-button");

        infoButtons[0].click();
        let text1 = screen.queryAllByText(
            "CISC108: Introduction to Computer Science I"
        );
        expect(text1[0]).toBeVisible();

        const editButton = screen.getAllByRole("button", {
            name: /Edit/i
        });
        editButton[0].click();

        const listingBox = screen.getByTestId("edit-listing");
        userEvent.clear(listingBox);
        userEvent.type(listingBox, "CISC118");
        const listingButton = screen.getByRole("button", {
            name: /Update Listing/i
        });
        listingButton.click();
        const hideButton = screen.getAllByRole("button", {
            name: /Hide/i
        });
        hideButton[1].click();

        const text = screen.queryAllByText(
            "CISC118: Introduction to Computer Science I"
        );
        text1 = screen.queryAllByText(
            "CISC108: Introduction to Computer Science I"
        );
        expect(text1[0]).toBeUndefined();
        expect(text[0]).toBeVisible();
    });

    test("Student can edit the course title ", () => {
        const showHides = screen.getAllByRole("button", {
            name: /Show/i
        });
        showHides[1].click();

        const infoButtons = screen.queryAllByTestId("info-button");

        infoButtons[0].click();

        let text1 = screen.queryAllByText(
            "CISC108: Introduction to Computer Science I"
        );
        expect(text1[0]).toBeVisible();

        const editButton = screen.getAllByRole("button", {
            name: /Edit/i
        });
        editButton[0].click();
        const titleBox = screen.getByTestId("edit-title");
        userEvent.clear(titleBox);
        userEvent.type(titleBox, "Intro to Computers");
        const titleButton = screen.getByRole("button", {
            name: /Update Title/i
        });
        titleButton.click();
        const hideButton = screen.getAllByRole("button", {
            name: /Hide/i
        });
        hideButton[1].click();

        const text = screen.queryAllByText("CISC108: Intro to Computers");
        text1 = screen.queryAllByText(
            "CISC108: Introduction to Computer Science I"
        );
        expect(text1[0]).toBeUndefined();
        expect(text[0]).toBeVisible();
    });

    test("Student can edit credits of a course", () => {
        const showHides = screen.getAllByRole("button", {
            name: /Show/i
        });
        showHides[1].click();

        const infoButtons = screen.queryAllByTestId("info-button");
        infoButtons[0].click();

        const editButton = screen.getAllByRole("button", {
            name: /Edit/i
        });
        editButton[0].click();

        const creditBox: HTMLInputElement = screen.getByTestId("edit-credits");
        expect(parseInt(creditBox.value)).toBe(3);
        userEvent.clear(creditBox);
        userEvent.type(creditBox, "6");
        const creditButton = screen.getByRole("button", {
            name: /Update Credits/i
        });
        creditButton.click();
        const hideButton = screen.getAllByRole("button", {
            name: /Hide/i
        });
        hideButton[1].click();

        expect(parseInt(creditBox.value)).toBe(6);
        
    });*/
});
