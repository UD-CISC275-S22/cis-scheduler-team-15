import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import CourseList from "./Data/course_list.json";

describe("Final Project Tests", () => {
    beforeEach(() => {
        render(<App />);
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
        const numButtons = allButtons.length;

        const deleteButton = screen.queryAllByRole("button", {
            name: /Click to delete/i
        })[0];
        deleteButton.click();
        allButtons = screen.queryAllByRole("button");
        expect(allButtons.length).toBe(numButtons - 1);
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

    /*
    test("Students can clear out semesters in a plan", () => {});

    */
   
    /*
    test("Students can establish that a course fulfills a degree requirement", () => {
    });

    test("Students can establish that a course meets another course's prerequisite", () => {
    });

    test("Students can override course's info, but also reset a course back to its default information", () => {
    });
    */
    test("Students can see a list of existing courses", () => {
        
    });

    //test("Students can edit the course code, course title, and credits of a course in the plan", () => {});
});
