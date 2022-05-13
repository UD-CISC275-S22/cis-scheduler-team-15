import React from "react";
import { render, screen } from "@testing-library/react";
import { DegreePlans } from "./Components/DegreePlans";
import AllCourses from "./Data/CourseList.json";
import userEvent from "@testing-library/user-event";
import { Course } from "./Interfaces/course";

//import ReactDOM from "react-dom";

describe("Final Project Tests (DegreePlans)", () => {
    beforeEach(() => {
        const COURSES = AllCourses.map((course): Course => ({ ...course }));
        render(
            <DegreePlans
                courses={[...COURSES]}
                concentration={"General (BA)"}
            />
        );
    });

    test("Students can see a list of all the degree plans they have made", () => {
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
        expect(defaults[0]).not.toBeUndefined();
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
    });

    test("Students can see a table that shows semesters and courses", () => {
        const firstDefault = screen.getByRole("button", {
            name: "Default"
        });
        firstDefault.click();
        const text1 = screen.queryByText("Fall 2020");
        const text2 = screen.queryByText("Spring 2022");
        const text3 = screen.queryByText("CISC108");
        const text4 = screen.queryByText("Introduction to Computer Science I");
        const text5 = screen.queryAllByText("Total Credits");
        expect(text1).toBeVisible();
        expect(text2).toBeVisible();
        expect(text3).toBeVisible();
        expect(text4).toBeVisible();
        expect(text5[0]).toBeVisible();
    });

    test("Students can insert or remove a semester in a plan", () => {
        const firstDefault = screen.queryAllByRole("button", {
            name: /Default/i
        })[2];
        firstDefault?.click();
        let text1 = screen.queryByText("Winter 2022");
        let text2 = screen.queryAllByText("Fall 2022");
        expect(text1).toBeNull();
        expect(text2[1]).toBeUndefined();
        expect(text2[0]).not.toBeUndefined();
        const editPlan = screen.queryByRole("button", {
            name: /Edit Plan 🖉/i
        });
        editPlan?.click();
        const addSemester = screen.queryByRole("button", {
            name: /Add Semester ➕/i
        });
        addSemester?.click();
        const createSemester = screen.queryByRole("button", {
            name: /Create Semester/i
        });
        createSemester?.click();
        text2 = screen.queryAllByText("Fall 2022");
        expect(text2[1]).toBeUndefined();
        expect(text2[0]).not.toBeUndefined();
        const seasonButton = screen.getAllByRole("combobox")[1];
        userEvent.selectOptions(seasonButton, "Winter");
        createSemester?.click();
        text1 = screen.queryByText("Winter 2022");
        expect(text1).not.toBeNull();
    });

    test("Students can clear out all the existing courses in a semester", () => {
        const degreePlanButton = screen.getAllByRole("button", {
            name: /Default/i
        })[2];
        degreePlanButton.click();
        const editPlanButton = screen.getByRole("button", {
            name: /Edit Plan 🖉/i
        });
        editPlanButton.click();
        const editSemesterButtons = screen.queryAllByRole("button", {
            name: /🖉/i
        });

        editSemesterButtons[1].click();
        const deleteAllButton = screen.getByRole("button", {
            name: /Delete All 🗑️/i
        });
        expect(deleteAllButton).not.toBeNull();

        let allButtons = screen.queryAllByRole("button");
        const allButtonsLength = allButtons.length;

        deleteAllButton.click();
        allButtons = screen.queryAllByRole("button");
        expect(allButtons.length).toBe(allButtonsLength - 15);
    });

    test("Students can clear out individual courses in a semester", () => {
        const degreePlanButton = screen.getByRole("button", {
            name: "Default"
        });
        degreePlanButton.click();
        const editPlanButton = screen.getByRole("button", {
            name: /Edit Plan 🖉/i
        });
        editPlanButton.click();
        const editSemesterButtons = screen.queryAllByRole("button", {
            name: "🖉"
        });

        editSemesterButtons[0].click();

        let allButtons = screen.queryAllByRole("button");
        const initialButtons = allButtons.length;
        const deleteButton = screen.queryByTitle("Click to delete CISC108");
        deleteButton?.click();
        allButtons = screen.queryAllByRole("button");
        expect(allButtons.length).toBe(initialButtons - 3);
    });

    test("Students can insert a course in a semester", () => {
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
        let text1 = screen.queryAllByText("CISC108");
        let text2 = screen.queryAllByText("MATH241");
        let text3 = screen.queryAllByText("EGGG101");
        let text4 = screen.queryByText("0/124❌");
        expect(text1[2]).toBeUndefined();
        expect(text2[2]).toBeUndefined();
        expect(text3[2]).toBeUndefined();
        expect(text4).toBeVisible();
        const editSemester = screen.getByRole("button", {
            name: "🖉"
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
        userEvent.selectOptions(selectCourses[3], newC[12]);
        adding = screen.getByRole("button", {
            name: "Click to add 13"
        });
        adding.click();
        userEvent.type(filter[1], "e");
        adding = screen.getByRole("button", {
            name: "Click to add 16"
        });
        adding.click();
        text1 = screen.queryAllByText("CISC108");
        text2 = screen.queryAllByText("MATH241");
        text3 = screen.queryAllByText("EGGG101");
        text4 = screen.queryByText("9/124❌");
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
        const seasonButton = screen.getAllByRole("combobox");
        userEvent.selectOptions(seasonButton[1], "Winter");
        createSemester?.click();
        const closeModal = screen.queryByRole("closebutton");
        closeModal?.click();
        let editSemester = screen.getAllByRole("button", {
            name: "🖉"
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
        userEvent.selectOptions(selectCourses[3], newC[12]);
        adding = screen.getByRole("button", {
            name: "Click to add 13"
        });
        adding.click();
        const closeModal2 = screen.queryByRole("closebutton");
        closeModal2?.click();

        editSemester = screen.getAllByRole("button", {
            name: "🖉"
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
        userEvent.type(filter[1], "e");
        adding = screen.getByRole("button", {
            name: "Click to add 16"
        });
        adding.click();

        const text4 = screen.queryByText("9/124❌");
        expect(text4).toBeVisible();
    });
    /*
    test("Students will get an error in the semester view when a course with an unsatisfied prerequisite or corequisite is added", () => {
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
        userEvent.type(filter[2], "181"); 

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

    // Henry test("Modify degree plan name", () => {});

    // Henry test("Modify degree plan start year", () => {});
});
