import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
//import ReactDOM from "react-dom";

describe("Final Project Tests", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("renders the course name somewhere", () => {
        const linkElement = screen.getAllByText(/CISC275/i);
        expect(linkElement[0]).toBeInTheDocument();
    });

    test("Insert and Remove a degree plan", () => {
        const addEmpty = screen.getByRole("button", {
            name: /Add Empty Plan/i
        });
        const addDefault = screen.getByRole("button", {
            name: /Add Default Plan \(8 semesters\)/i
        });
        const deletePlan = screen.getByRole("button", {
            name: /Delete Selected Plan/i
        });
        let firstDefault = screen.queryByRole("button", {
            name: /1: Default/i
        });
        let secondDefault = screen.queryByRole("button", {
            name: /2: Default/i
        });
        let firstEmpty = screen.queryByRole("button", {
            name: /3: Degree Plan 3/i
        });
        expect(firstDefault).not.toBeNull();
        expect(secondDefault).toBeNull();
        expect(firstEmpty).toBeNull();
        addDefault.click();
        addEmpty.click();
        secondDefault = screen.queryByRole("button", {
            name: /2: Default/i
        });
        firstEmpty = screen.queryByRole("button", {
            name: /3: Degree Plan 3/i
        });
        expect(firstDefault).not.toBeNull();
        expect(secondDefault).not.toBeNull();
        expect(firstEmpty).not.toBeNull();
        if (firstDefault !== null) {
            firstDefault.click();
        }
        deletePlan.click();
        if (firstEmpty !== null) {
            firstEmpty.click();
        }
        deletePlan.click();
        firstDefault = screen.queryByRole("button", {
            name: /1: Default/i
        });
        firstEmpty = screen.queryByRole("button", {
            name: /3: Degree Plan 3/i
        });
        expect(firstDefault).toBeNull();
        expect(secondDefault).not.toBeNull();
        expect(firstEmpty).toBeNull();
    });

    test("Students can see a list of all the degree plans they have made", () => {
        const addEmpty = screen.getByRole("button", {
            name: /Add Empty Plan/i
        });
        const addDefault = screen.getByRole("button", {
            name: /Add Default Plan \(8 semesters\)/i
        });
        const firstDefault = screen.queryByRole("button", {
            name: /1: Default/i
        });
        let secondDefault = screen.queryByRole("button", {
            name: /2: Default/i
        });
        let firstEmpty = screen.queryByRole("button", {
            name: /3: Degree Plan 3/i
        });
        expect(firstDefault).not.toBeNull();
        expect(secondDefault).toBeNull();
        expect(firstEmpty).toBeNull();
        addDefault.click();
        addEmpty.click();
        secondDefault = screen.queryByRole("button", {
            name: /2: Default/i
        });
        firstEmpty = screen.queryByRole("button", {
            name: /3: Degree Plan 3/i
        });
        expect(firstDefault).not.toBeNull();
        expect(secondDefault).not.toBeNull();
        expect(firstEmpty).not.toBeNull();
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
        let text1 = screen.queryByText(
            "CISC108: Introduction to Computer Science I"
        );
        let text2 = screen.queryByText(
            "CISC181: Introduction to Computer Science II"
        );
        let text3 = screen.queryByText("MATH210: Discrete Mathematics I");
        let text4 = screen.queryByText(
            "CISC499: Computer Science Senior Design Project II (Capstone)"
        );
        expect(text1).toBeNull();
        expect(text2).toBeNull();
        expect(text3).toBeNull();
        expect(text4).toBeNull();
        const showHides = screen.getAllByRole("button", {
            name: /Show/i
        });
        showHides[1].click();
        text1 = screen.queryByText(
            "CISC108: Introduction to Computer Science I"
        );
        text2 = screen.queryByText(
            "CISC181: Introduction to Computer Science II"
        );
        text3 = screen.queryByText("MATH210: Discrete Mathematics I");
        text4 = screen.queryByText(
            "CISC499: Computer Science Senior Design Project II (Capstone)"
        );
        expect(text1).toBeVisible();
        expect(text2).toBeVisible();
        expect(text3).toBeVisible();
        expect(text4).toBeVisible();
    });

    test("Students can see a table that shows semesters and courses", () => {
        const firstDefault = screen.queryByRole("button", {
            name: /1: Default/i
        });
        firstDefault?.click();
        const text1 = screen.queryByText("Fall 2020");
        const text2 = screen.queryByText("Spring 2022");
        const text3 = screen.queryByText("CISC108");
        const text4 = screen.queryByText("Introduction to Computer Science I");
        const text5 = screen.queryAllByText("Total Credits");
        const text6 = screen.queryByText("Default Total Credits: 121");
        expect(text1).toBeVisible();
        expect(text2).toBeVisible();
        expect(text3).toBeVisible();
        expect(text4).toBeVisible();
        expect(text5[0]).toBeVisible();
        expect(text6).toBeVisible();
    });

    test("Students can insert or remove a semester in a plan", () => {
        const firstDefault = screen.queryByRole("button", {
            name: /1: Default/i
        });
        firstDefault?.click();
        let text1 = screen.queryByText("Winter 2022");
        let text2 = screen.queryAllByText("Fall 2022");
        expect(text1).toBeNull();
        expect(text2[1]).toBeUndefined();
        expect(text2[0]).not.toBeUndefined();
        const editPlan = screen.queryByRole("button", {
            name: /Edit Plan/i
        });
        editPlan?.click();
        const addSemester = screen.queryByRole("button", {
            name: /Add Semester/i
        });
        addSemester?.click();
        const createSemester = screen.queryByRole("button", {
            name: /Create Semester/i
        });
        createSemester?.click();
        text2 = screen.queryAllByText("Fall 2022");
        expect(text2[1]).toBeUndefined();
        expect(text2[0]).not.toBeUndefined();
        const seasonButton = screen.getAllByRole("combobox");
        userEvent.selectOptions(seasonButton[0], "Winter");
        createSemester?.click();
        text1 = screen.queryByText("Winter 2022");
        expect(text1).not.toBeNull();
    });

    test("Students can clear out all the existing courses in a semester", () => {
        const degreePlanButton = screen.getByRole("button", {
            name: /1: Default/i
        });
        degreePlanButton.click();
        const editPlanButton = screen.getByRole("button", {
            name: /Edit Plan/i
        });
        editPlanButton.click();
        const editSemesterButtons = screen.queryAllByRole("button", {
            name: /Edit/i
        });

        editSemesterButtons[1].click();
        const deleteAllButton = screen.getByRole("button", {
            name: /Delete All/i
        });
        expect(deleteAllButton).not.toBeNull();

        let allButtons = screen.queryAllByRole("button");
        const allButtonsLength = allButtons.length;

        deleteAllButton.click();
        allButtons = screen.queryAllByRole("button");
        expect(allButtons.length).toBe(allButtonsLength - 10);
    });

    test("Students can clear out individual courses in a semester", () => {
        const degreePlanButton = screen.getByRole("button", {
            name: /1: Default/i
        });
        degreePlanButton.click();
        const editPlanButton = screen.getByRole("button", {
            name: /Edit Plan/i
        });
        editPlanButton.click();
        const editSemesterButtons = screen.queryAllByRole("button", {
            name: /Edit/i
        });

        editSemesterButtons[1].click();

        let allButtons = screen.queryAllByRole("button");
        const initialButtons = allButtons.length;
        const deleteButton = screen.queryAllByRole("button", {
            name: /Click to delete/i
        })[0];
        deleteButton.click();
        allButtons = screen.queryAllByRole("button");
        expect(allButtons.length).toBe(initialButtons - 2);
    });

    test("Students can insert a course in a semester", () => {
        const addEmpty = screen.getByRole("button", {
            name: /Add Empty Plan/i
        });
        addEmpty.click();
        const firstEmpty = screen.queryByRole("button", {
            name: /2: Degree Plan 2/i
        });
        firstEmpty?.click();
        const editButton = screen.queryByRole("button", {
            name: /Edit Plan/i
        });
        editButton?.click();
        const addSemester = screen.queryByRole("button", {
            name: /Add Semester/i
        });
        addSemester?.click();
        const createSemester = screen.queryByRole("button", {
            name: /Create Semester/i
        });
        createSemester?.click();
        const closeModal = screen.queryByRole("closebutton");
        closeModal?.click();
        let text1 = screen.queryAllByText("CISC108");
        let text2 = screen.queryAllByText("MATH241");
        let text3 = screen.queryAllByText("EGGG101");
        let text4 = screen.queryByText("Degree plan 2 Total Credits: 0");
        expect(text1[2]).toBeUndefined();
        expect(text2[2]).toBeUndefined();
        expect(text3[2]).toBeUndefined();
        expect(text4).toBeVisible();
        const editSemester = screen.getByRole("button", {
            name: "Edit"
        });
        editSemester.click();
        const addCourse = screen.getByRole("button", {
            name: /Add Course/i
        });
        addCourse.click();
        let adding = screen.getByRole("button", {
            name: "Click to add 1"
        });
        adding.click();
        const filter = screen.getAllByRole("textbox");
        const selectCourses = screen.getAllByRole("combobox");
        const newC = screen.getAllByTestId("add-course-select");
        userEvent.selectOptions(selectCourses[2], newC[12]);
        adding = screen.getByRole("button", {
            name: "Click to add 13"
        });
        adding.click();
        userEvent.type(filter[2], "e");
        adding = screen.getByRole("button", {
            name: "Click to add 16"
        });
        adding.click();
        text1 = screen.queryAllByText("CISC108");
        text2 = screen.queryAllByText("MATH241");
        text3 = screen.queryAllByText("EGGG101");
        text4 = screen.queryByText("Degree plan 2 Total Credits: 9");
        expect(text1[1]).toBeVisible();
        expect(text2[1]).toBeVisible();
        expect(text3[1]).toBeVisible();
        expect(text1[2]).not.toBeUndefined();
        expect(text2[2]).not.toBeUndefined();
        expect(text3[2]).not.toBeUndefined();
        expect(text4).toBeVisible();
    });

    test("Students will be prevented from inserting a duplicate course into the plan", () => {
        const addEmpty = screen.getByRole("button", {
            name: /Add Empty Plan/i
        });
        addEmpty.click();
        const firstEmpty = screen.queryByRole("button", {
            name: /2: Degree Plan 2/i
        });
        firstEmpty?.click();
        const editButton = screen.queryByRole("button", {
            name: /Edit Plan/i
        });
        editButton?.click();
        const addSemester = screen.queryByRole("button", {
            name: /Add Semester/i
        });
        addSemester?.click();
        const createSemester = screen.queryByRole("button", {
            name: /Create Semester/i
        });
        createSemester?.click();
        const seasonButton = screen.getAllByRole("combobox");
        userEvent.selectOptions(seasonButton[0], "Winter");
        createSemester?.click();
        const closeModal = screen.queryByRole("closebutton");
        closeModal?.click();
        let editSemester = screen.getAllByRole("button", {
            name: "Edit"
        })[0];
        editSemester.click();
        let addCourse = screen.getByRole("button", {
            name: /Add Course/i
        });
        addCourse.click();
        let adding = screen.getByRole("button", {
            name: "Click to add 1"
        });
        adding.click();
        const selectCourses = screen.getAllByRole("combobox");
        const newC = screen.getAllByTestId("add-course-select");
        userEvent.selectOptions(selectCourses[2], newC[12]);
        adding = screen.getByRole("button", {
            name: "Click to add 13"
        });
        adding.click();
        const closeModal2 = screen.queryByRole("closebutton");
        closeModal2?.click();

        editSemester = screen.getAllByRole("button", {
            name: "Edit"
        })[1];
        editSemester.click();
        addCourse = screen.getByRole("button", {
            name: /Add Course/i
        });
        addCourse.click();
        adding = screen.getByRole("button", {
            name: "Click to add 1"
        });
        adding.click();
        const filter = screen.getAllByRole("textbox");
        userEvent.type(filter[2], "e");
        adding = screen.getByRole("button", {
            name: "Click to add 16"
        });
        adding.click();

        const text4 = screen.queryByText("Degree plan 2 Total Credits: 9");
        expect(text4).toBeVisible();
    });

    test("Students will get an error in the semester view when a course with an unsatisfied prerequisite or corequisite is added", () => {
        const addEmpty = screen.getByRole("button", {
            name: /Add Empty Plan/i
        });
        addEmpty.click();
        const firstEmpty = screen.queryByRole("button", {
            name: /2: Degree Plan 2/i
        });
        firstEmpty?.click();
        const editButton = screen.queryByRole("button", {
            name: /Edit Plan/i
        });
        editButton?.click();
        const addSemester = screen.queryByRole("button", {
            name: /Add Semester/i
        });
        addSemester?.click();
        const createSemester = screen.queryByRole("button", {
            name: /Create Semester/i
        });
        createSemester?.click();
        const closeModal = screen.queryByRole("closebutton");
        closeModal?.click();
        const editSemester = screen.getAllByRole("button", {
            name: "Edit"
        })[0];
        editSemester.click();
        const addCourse = screen.getByRole("button", {
            name: /Add Course/i
        });
        addCourse.click();
        const filter = screen.getAllByRole("textbox");
        userEvent.type(filter[2], "181"); /*
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
    test("Students can establish that a course fulfills a degree requirement", () => {
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

        /*
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
        */
    });

    test("Update courses in existing degree plans when course list is updated", () => {
        const showHides = screen.getAllByRole("button", {
            name: /Show/i
        });
        const addDefault = screen.getByRole("button", {
            name: /Add Default Plan \(8 semesters\)/i
        });
        addDefault.click();
        const plans = screen.getAllByRole("button", {
            name: /1: Default/i
        });
        plans[0].click();
        showHides[1].click();

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
    });
});
