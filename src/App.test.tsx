import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
//import AllCourses from "./Data/course_list.json";
//import { Course } from "./Interfaces/course";

//const COURSES = AllCourses.map((course): Course => ({ ...course }));

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
        expect(allButtons.length).toBe(allButtonsLength - 5);
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
        expect(allButtons.length).toBe(initialButtons - 1);
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
        userEvent.type(filter[2], "181");
        let prereqMessage = screen.queryByText(
            "There are unsatisfied prerequisites for this course. Unsatisfied prerequisite(s): CISC108"
        );
        let coreqMessage = screen.queryByText(
            "There are unsatisfied corequisites for this course. Unsatisfied corequisite(s): MATH241"
        );
        expect(prereqMessage).toBeNull();
        expect(coreqMessage).toBeNull();

        const adding = screen.getByRole("button", {
            name: "Click to add 2"
        });
        adding.click();
        prereqMessage = screen.queryByText(
            "There are unsatisfied prerequisites for this course. Unsatisfied prerequisite(s): CISC108"
        );
        coreqMessage = screen.queryByText(
            "There are unsatisfied corequisites for this course. Unsatisfied corequisite(s): MATH241"
        );
        expect(prereqMessage).toBeVisible();
        expect(coreqMessage).toBeVisible();
    });
    /*
    test("Students can clear out semesters in a plan", () => {});

    */

    /*Mike's Tests
    test("Students can establish that a course fulfills a degree requirement", () => {
    });
    */

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

        let text = screen.queryByText("CISC210");
        const text1 = screen.queryAllByText("N/A");
        expect(text1[0]).not.toBeDefined();
        expect(text).toBeVisible();

        hideButton[0].click();
        addPreReqButton.click();
        text = screen.queryByText("Course already a PreReq");
        expect(text).toBeVisible();
    });

    /*
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
        let preReqOptions = screen.getAllByTestId("remove-preReq");
        const preReqBox = screen.getAllByRole("combobox");
        userEvent.selectOptions(preReqBox[0], preReqOptions[1]);
        const removePreReqButton = screen.getByRole("button", {
            name: /Remove PreReq/i
        });
        const addPreReqButton = screen.getByRole("button", {
            name: /Add PreReq/i
        });

        removePreReqButton.click();
        let text = screen.queryByText("Course not one of the PreReqs");
        expect(text).toBeVisible();

        preReqOptions = screen.getAllByTestId("add-preReq");
        userEvent.selectOptions(preReqBox[0], preReqOptions[1]);

        addPreReqButton.click();

        text = screen.queryByText("Course not one of the PreReqs");
        expect(text).not.toBeVisible();

        removePreReqButton.click();
        expect(text).not.toBeVisible();

        const hideButton = screen.getAllByRole("button", {
            name: /Hide/i
        });
        hideButton[0].click();

        text = screen.queryByText("CISC210");
        const text1 = screen.queryAllByText("N/A");
        expect(text1[0]).not.toBeDefined();
        expect(text).not.toBeVisible();

        removePreReqButton.click();
    });
    */
    /*
    test("Students can establish that a course meets another course's corequisite", () => {});

    
    //Ask about the below test
    test("Students can override course's info, but also reset a course back to its default information", () => {
    });
    */

    /*
    test("Students can reset course's info back to default", () => {
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

        const listingBox = screen.getByTestId("edit-listing");
        userEvent.type(listingBox, "CISC118");
        const listingButton = screen.getByRole("button", {
            name: /Update Listing/i
        });
        listingButton.click();
        let text = screen.queryByText("CISC118");
        let text1 = screen.queryAllByText(COURSES[0].listing);
        expect(text1[0]).not.toBeVisible();
        expect(text).toBeVisible;

        const titleBox = screen.getByTestId("edit-title");
        userEvent.type(titleBox, "Intro to Computers");
        const titleButton = screen.getByRole("button", {
            name: /Update Title/i
        });
        titleButton.click();
        text = screen.queryByText("Intro to Computers");
        text1 = screen.queryAllByText(COURSES[0].title);
        expect(text1[0]).not.toBeVisible();
        expect(text).toBeVisible;

        const creditBox = screen.getByTestId("edit-credits");
        userEvent.type(creditBox, "6");
        const creditButton = screen.getByRole("button", {
            name: /Update Credits/i
        });
        creditButton.click();
        text = screen.queryByText("6");
        text1 = screen.queryAllByText(COURSES[0].credits);
        expect(text1[0]).not.toBeVisible();
        expect(text).toBeVisible;
    });
    */

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

    /*
    test("Student can edit credits of a course", () => {
        const showHides = screen.getAllByRole("button", {
            name: /Show/i
        });
        showHides[1].click();

        const infoButtons = screen.queryAllByTestId("info-button");
        infoButtons[0].click();



        let text = screen.queryAllByText("Credit(s): 3");
        expect(text[0]).toBeVisible();

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
        hideButton[1].click();

        text = screen.queryAllByText("Credit(s): 6");
        const text1 = screen.queryAllByText("Credit(s): 3");
        expect(text1[0]).toBeUndefined();
        expect(text[0]).toBeVisible();
    });
    */
});
