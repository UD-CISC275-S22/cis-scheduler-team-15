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

    /*
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
        //expect(coreqMessage).toBeVisible();
    });
    */
    /*
    test("Students can clear out semesters in a plan", () => {});

    */

    //Mike's Tests
    test("Students can establish that a course fulfills a degree requirement", () => {
        const courseListButton = screen.getByRole("button", {
            name: /Move to Course List 📄/i
        });
        courseListButton.click();

        const firstAccordian = screen.getAllByTestId("accordian-item");
        firstAccordian[0].click();

        const editButton = screen.getAllByRole("button", {
            name: /Edit/i
        });
        editButton[0].click();

        const uAccordian = screen.queryByTestId("edit-univ-req-accordian");
        const uOptions = screen.queryAllByTestId("edit-univ-req-option");
        uAccordian?.click();
        uOptions[0].click();
        expect(
            firstAccordian[0].innerHTML.toString().replace(/<[^>]+>/g, "")
        ).toMatch("Degree Requirements Satified: CISC108, FYS");

        const cAccordian = screen.queryByTestId("edit-coll-req-accordian");
        const cOptions = screen.queryAllByTestId("edit-coll-req-option");
        cAccordian?.click();
        cOptions[0].click();
        expect(
            firstAccordian[0].innerHTML.toString().replace(/<[^>]+>/g, "")
        ).toMatch("Degree Requirements Satified: CISC108, FYS, FL");

        const mAccordian = screen.queryByTestId("edit-major-req-accordian");
        const mOptions = screen.queryAllByTestId("edit-major-req-option");
        mAccordian?.click();
        mOptions[0].click();
        expect(
            firstAccordian[0].innerHTML.toString().replace(/<[^>]+>/g, "")
        ).toMatch("Degree Requirements Satified: FYS, FL");
        mOptions[1].click();
        expect(
            firstAccordian[0].innerHTML.toString().replace(/<[^>]+>/g, "")
        ).toMatch("Degree Requirements Satified: FYS, FL, CISC181");
    });

    test("Students can reset course's info back to default", () => {
        const courseListButton = screen.getByRole("button", {
            name: /Move to Course List 📄/i
        });
        courseListButton.click();

        const text1 = screen.queryAllByText(
            "CISC108: Introduction to Computer Science I"
        );
        expect(text1[0]).toBeVisible();
        const firstAccordian = screen.getAllByTestId("accordian-item");
        firstAccordian[0].click();

        const editButton = screen.getAllByRole("button", {
            name: /Edit/i
        });
        editButton[0].click();

        const listingBox = screen.getByTestId("edit-listing");
        userEvent.clear(listingBox);
        userEvent.type(listingBox, "CISC4000");
        const listingButton = screen.getByRole("button", {
            name: /Update Listing/i
        });
        listingButton.click();

        const titleBox = screen.getByTestId("edit-title");
        userEvent.clear(titleBox);
        userEvent.type(titleBox, "Intro to Computers");
        const titleButton = screen.getByRole("button", {
            name: /Update Title/i
        });
        titleButton.click();

        const creditBox = screen.getByTestId("edit-credits");
        userEvent.clear(creditBox);
        userEvent.type(creditBox, "90");
        const creditButton = screen.getByRole("button", {
            name: /Update Credits/i
        });
        creditButton.click();

        expect(
            firstAccordian[0].innerHTML.toString().replace(/<[^>]+>/g, "")
        ).toMatch("Credit(s): 90");
        let text = screen.queryAllByText("CISC4000: Intro to Computers");
        expect(text[0]).toBeVisible();
        const resetButton = screen.getByRole("button", {
            name: /Reset Course to Default/i
        });

        const uAccordian = screen.queryByTestId("edit-univ-req-accordian");
        const uOptions = screen.queryAllByTestId("edit-univ-req-option");
        uAccordian?.click();
        uOptions[0].click();
        const cAccordian = screen.queryByTestId("edit-coll-req-accordian");
        const cOptions = screen.queryAllByTestId("edit-coll-req-option");
        cAccordian?.click();
        cOptions[0].click();
        const mAccordian = screen.queryByTestId("edit-major-req-accordian");
        const mOptions = screen.queryAllByTestId("edit-major-req-option");
        mAccordian?.click();
        mOptions[1].click();
        expect(
            firstAccordian[0].innerHTML.toString().replace(/<[^>]+>/g, "")
        ).toMatch("Degree Requirements Satified: CISC108, FYS, FL, CISC181");

        resetButton.click();
        expect(
            firstAccordian[0].innerHTML.toString().replace(/<[^>]+>/g, "")
        ).toMatch("Credit(s): 3");
        text = screen.queryAllByText(
            "CISC108: Introduction to Computer Science I"
        );
        expect(
            firstAccordian[0].innerHTML.toString().replace(/<[^>]+>/g, "")
        ).toMatch("Degree Requirements Satified: CISC108");
        expect(text[0]).toBeVisible();
    });
    test("Update courses in existing degree plans when course list is updated", () => {
        const courseListButton = screen.getByRole("button", {
            name: /Move to Course List 📄/i
        });
        courseListButton.click();

        const text1 = screen.queryAllByText(
            "CISC108: Introduction to Computer Science I"
        );
        expect(text1[0]).toBeVisible();
        const firstAccordian = screen.getAllByTestId("accordian-item");
        firstAccordian[0].click();

        const editButton = screen.getAllByRole("button", {
            name: /Edit/i
        });
        editButton[0].click();

        const listingBox = screen.getByTestId("edit-listing");
        userEvent.clear(listingBox);
        userEvent.type(listingBox, "CISC4000");
        const listingButton = screen.getByRole("button", {
            name: /Update Listing/i
        });
        listingButton.click();

        const titleBox = screen.getByTestId("edit-title");
        userEvent.clear(titleBox);
        userEvent.type(titleBox, "Intro to Computers");
        const titleButton = screen.getByRole("button", {
            name: /Update Title/i
        });
        titleButton.click();

        const creditBox = screen.getByTestId("edit-credits");
        userEvent.clear(creditBox);
        userEvent.type(creditBox, "90");
        const creditButton = screen.getByRole("button", {
            name: /Update Credits/i
        });
        creditButton.click();

        const degreePlansButton = screen.getByRole("button", {
            name: /Move to Degree Plans 📖/i
        });
        degreePlansButton.click();

        const defaultPlanButton = screen.getAllByRole("button", {
            name: /Default/i
        });
        defaultPlanButton[2].click();
        const text3 = screen.queryAllByText("CISC4000");
        const text2 = screen.queryAllByText("90");
        const text4 = screen.queryAllByText("Intro to Computers");
        expect(text3[0]).toBeVisible();
        expect(text2[0]).toBeVisible();
        expect(text4[0]).toBeVisible();
    });

    test("Students can remove or add a course as a course's prerequisite and not remove non-existent prerequisite", () => {
        const courseListButton = screen.getByRole("button", {
            name: /Move to Course List 📄/i
        });
        courseListButton.click();

        const firstAccordian = screen.getAllByTestId("accordian-item");
        firstAccordian[0].click();

        const editButton = screen.getAllByRole("button", {
            name: /Edit/i
        });
        editButton[0].click();

        expect(
            firstAccordian[0].innerHTML.toString().replace(/<[^>]+>/g, "")
        ).toMatch("Pre-Requisite Courses: N/A");

        const preReqOptionsRem = screen.getAllByTestId("remove-preReq");
        const preReqBox = screen.getAllByRole("combobox");
        userEvent.selectOptions(preReqBox[1], preReqOptionsRem[0]);
        const removePreReqButton = screen.getByRole("button", {
            name: /Remove PreReq/i
        });
        const addPreReqButton = screen.getByRole("button", {
            name: /Add PreReq/i
        });

        removePreReqButton.click();
        expect(
            firstAccordian[0].innerHTML.toString().replace(/<[^>]+>/g, "")
        ).toMatch("Pre-Requisite Courses: N/A");
        expect(
            firstAccordian[0].innerHTML.toString().replace(/<[^>]+>/g, "")
        ).toMatch("Course not one of the PreReqs");

        const preReqOptionsAdd = screen.getAllByTestId("add-preReq");
        userEvent.selectOptions(preReqBox[0], preReqOptionsAdd[0]);
        addPreReqButton.click();
        expect(
            firstAccordian[0].innerHTML.toString().replace(/<[^>]+>/g, "")
        ).toMatch("Pre-Requisite Courses: CISC181");

        userEvent.selectOptions(preReqBox[1], preReqOptionsRem[0]);
        removePreReqButton.click();
        expect(
            firstAccordian[0].innerHTML.toString().replace(/<[^>]+>/g, "")
        ).toMatch("Pre-Requisite Courses: N/A");
    });

    test("Students can remove or add a course as a course's corequisite and not remove non-existent corequisite", () => {
        const courseListButton = screen.getByRole("button", {
            name: /Move to Course List 📄/i
        });
        courseListButton.click();

        const firstAccordian = screen.getAllByTestId("accordian-item");
        firstAccordian[0].click();

        const editButton = screen.getAllByRole("button", {
            name: /Edit/i
        });
        editButton[0].click();

        expect(
            firstAccordian[0].innerHTML.toString().replace(/<[^>]+>/g, "")
        ).toMatch("Co-Requisite Courses: MATH241");

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
        expect(
            firstAccordian[0].innerHTML.toString().replace(/<[^>]+>/g, "")
        ).toMatch("Co-Requisite Courses: MATH241");
        expect(
            firstAccordian[0].innerHTML.toString().replace(/<[^>]+>/g, "")
        ).toMatch("Course not one of the CoReqs");

        const coReqOptionsAdd = screen.getAllByTestId("add-coReq");
        userEvent.selectOptions(coReqBox[2], coReqOptionsAdd[0]);
        addCoReqButton.click();
        expect(
            firstAccordian[0].innerHTML.toString().replace(/<[^>]+>/g, "")
        ).toMatch("Co-Requisite Courses: CISC181, MATH241");

        userEvent.selectOptions(coReqBox[3], coReqOptionsRem[0]);
        removeCoReqButton.click();
        expect(
            firstAccordian[0].innerHTML.toString().replace(/<[^>]+>/g, "")
        ).toMatch("Co-Requisite Courses: MATH241");
    });

    test("Students can see a list of existing courses", () => {
        const courseListButton = screen.getByRole("button", {
            name: /Move to Course List 📄/i
        });
        courseListButton.click();

        const accordions = screen.queryAllByTestId("accordian-item", {});
        expect(accordions.length).toBe(45);
    });

    test("Students can edit the course code", () => {
        const courseListButton = screen.getByRole("button", {
            name: /Move to Course List 📄/i
        });
        courseListButton.click();

        let text1 = screen.queryAllByText(
            "CISC108: Introduction to Computer Science I"
        );
        expect(text1[0]).toBeVisible();
        const firstAccordian = screen.getAllByTestId("accordian-item");
        firstAccordian[0].click();

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
        hideButton[0].click();

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
        const courseListButton = screen.getByRole("button", {
            name: /Move to Course List 📄/i
        });
        courseListButton.click();

        let text1 = screen.queryAllByText(
            "CISC108: Introduction to Computer Science I"
        );
        expect(text1[0]).toBeVisible();
        const firstAccordian = screen.getAllByTestId("accordian-item");
        firstAccordian[0].click();

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
        hideButton[0].click();

        const text = screen.queryAllByText("CISC108: Intro to Computers");
        text1 = screen.queryAllByText(
            "CISC108: Introduction to Computer Science I"
        );
        expect(text1[0]).toBeUndefined();
        expect(text[0]).toBeVisible();
    });

    test("Student can edit credits of a course", () => {
        const courseListButton = screen.getByRole("button", {
            name: /Move to Course List 📄/i
        });
        courseListButton.click();

        const firstAccordian = screen.getAllByTestId("accordian-item");
        firstAccordian[0].click();

        expect(
            firstAccordian[0].innerHTML.toString().replace(/<[^>]+>/g, "")
        ).toMatch("Credit(s): 3");

        const editButton = screen.getAllByRole("button", {
            name: /Edit/i
        });
        editButton[0].click();

        const creditBox = screen.getByTestId("edit-credits");
        userEvent.clear(creditBox);
        userEvent.type(creditBox, "6");
        const creditButton = screen.getByRole("button", {
            name: /Update Credits/i
        });
        creditButton.click();
        const hideButton = screen.getAllByRole("button", {
            name: /Hide/i
        });
        hideButton[0].click();

        expect(
            firstAccordian[0].innerHTML.toString().replace(/<[^>]+>/g, "")
        ).toMatch("Credit(s): 6");
    });
});
