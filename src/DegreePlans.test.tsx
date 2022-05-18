import React from "react";
import { render, screen } from "@testing-library/react";
import { DegreePlans } from "./Components/DegreePlans";
import AllCourses from "./Data/CourseList.json";
import userEvent from "@testing-library/user-event";
import { Course } from "./Interfaces/Course";

describe("Final Project Tests (DegreePlans)", () => {
    beforeEach(() => {
        const COURSES = AllCourses.map((course): Course => ({ ...course }));
        // Placeholder functions, not used in this file
        function insertCourse(newCourse: Course) {
            newCourse;
        }
        function save() {
            console.log("");
        }
        function revert() {
            console.log("");
        }
        render(
            <DegreePlans
                courses={[...COURSES]}
                concentration={"General (BA)"}
                insertCourse={insertCourse}
                saveCourses={save}
                revertCourses={revert}
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
            name: /Click to edit Spring 2021/i
        });

        editSemesterButtons[0].click();
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
            name: "Click to edit Fall 2020"
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
            name: "Click to edit Fall 2022"
        });
        editSemester.click();
        const addCourse = screen.getByRole("button", {
            name: /Add Course/i
        });
        addCourse.click();
        let adding = screen.getByRole("button", {
            name: "Click to add CISC108"
        });
        adding.click();
        const filter = screen.getAllByRole("textbox");
        const selectCourses = screen.getAllByRole("combobox");
        const newC = screen.getAllByTestId("add-course-select");
        userEvent.selectOptions(selectCourses[3], newC[12]);
        adding = screen.getByRole("button", {
            name: "Click to add MATH241"
        });
        adding.click();
        userEvent.type(filter[1], "e");
        adding = screen.getByRole("button", {
            name: "Click to add EGGG101"
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
        let editSemester = screen.getByRole("button", {
            name: "Click to edit Fall 2022"
        });
        editSemester.click();
        let addCourse = screen.getByRole("button", {
            name: /Add Course/i
        });
        addCourse.click();
        let adding = screen.getByRole("button", {
            name: "Click to add CISC108"
        });
        adding.click();
        const selectCourses = screen.getAllByRole("combobox");
        const newC = screen.getAllByTestId("add-course-select");
        userEvent.selectOptions(selectCourses[3], newC[12]);
        adding = screen.getByRole("button", {
            name: "Click to add MATH241"
        });
        adding.click();
        const closeModal2 = screen.queryByRole("closebutton");
        closeModal2?.click();

        editSemester = screen.getByRole("button", {
            name: "Click to edit Winter 2022"
        });
        editSemester.click();
        addCourse = screen.getByRole("button", {
            name: /Add Course/i
        });
        addCourse.click();
        adding = screen.getByRole("button", {
            name: "Click to add CISC108"
        });
        adding.click();
        const filter = screen.getAllByRole("textbox");
        userEvent.type(filter[1], "e");
        adding = screen.getByRole("button", {
            name: "Click to add EGGG101"
        });
        adding.click();

        const text4 = screen.queryByText("9/124❌");
        expect(text4).toBeVisible();
    });

    test("Students can move courses between semesters", () => {
        const degreePlanButton = screen.getByRole("button", {
            name: "Default"
        });
        degreePlanButton.click();
        const editPlanButton = screen.getByRole("button", {
            name: /Edit Plan 🖉/i
        });
        editPlanButton.click();
        let editSemesterButtons = screen.getByRole("button", {
            name: "Click to edit Fall 2020"
        });
        editSemesterButtons.click();
        const trashButtons1InitLength = screen.getAllByTestId(
            "delete-course-button"
        ).length;
        let closeModal1 = screen.queryByRole("closebutton");
        closeModal1?.click();
        editSemesterButtons = screen.getByRole("button", {
            name: "Click to edit Spring 2021"
        });
        editSemesterButtons.click();
        const trashButtons2InitLength =
            screen.getAllByTestId("delete-course-button").length -
            trashButtons1InitLength;
        const closeModal2 = screen.queryByRole("closebutton");
        closeModal2?.click();
        editSemesterButtons = screen.getByRole("button", {
            name: "Click to edit Fall 2020"
        });
        editSemesterButtons.click();
        const moveCourseButton = screen.getAllByTestId("move-course-button")[0];
        moveCourseButton.click();
        const trashButtons1AfterLength =
            screen.getAllByTestId("delete-course-button").length -
            trashButtons2InitLength -
            1;
        closeModal1 = screen.queryByRole("closebutton");
        closeModal1?.click();
        editSemesterButtons = screen.getByRole("button", {
            name: "Click to edit Spring 2021"
        });
        editSemesterButtons.click();
        const trashButtons2AfterLength =
            screen.getAllByTestId("delete-course-button").length -
            trashButtons1AfterLength;

        expect(trashButtons1AfterLength).toBe(trashButtons1InitLength - 1);
        expect(trashButtons2AfterLength).toBe(trashButtons2InitLength + 1);
    });

    test("Students will see all errors from their degree plan in the degree plan view", () => {
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
        let editSemester = screen.getByRole("button", {
            name: "Click to edit Fall 2022"
        });
        editSemester.click();
        let addCourse = screen.getByRole("button", {
            name: /Add Course/i
        });
        addCourse.click();
        let adding = screen.getByRole("button", {
            name: "Click to add CISC108"
        });
        adding.click();
        let filter = screen.getAllByRole("textbox");
        userEvent.type(filter[1], "242");
        adding = screen.getByRole("button", {
            name: "Click to add MATH242"
        });
        adding.click();
        const closeModal2 = screen.queryByRole("closebutton");
        closeModal2?.click();
        let errorButton = screen.getByRole("button", {
            name: "⚠ Show Errors ⚠"
        });
        errorButton.click();
        let errorText = screen.queryByTestId("CISC108 error-all errors");
        expect(errorText).not.toBeNull();
        errorText = screen.queryByTestId("MATH242 error-all errors");
        expect(errorText).not.toBeNull();
        editSemester = screen.getByRole("button", {
            name: "Click to edit Winter 2022"
        });
        editSemester.click();
        addCourse = screen.getByRole("button", {
            name: /Add Course/i
        });
        addCourse.click();
        filter = screen.getAllByRole("textbox");
        userEvent.type(filter[2], "241");
        adding = screen.getByRole("button", {
            name: "Click to add MATH241"
        });
        adding.click();
        const closeModal3 = screen.queryByRole("closebutton");
        closeModal3?.click();
        const hideErrorButton = screen.getByRole("button", {
            name: "🛑 Hide Errors 🛑"
        });
        hideErrorButton.click();
        errorButton = screen.getByRole("button", {
            name: "⚠ Show Errors ⚠"
        });
        errorButton.click();
        errorText = screen.queryByTestId("CISC108 error-all errors");
        expect(errorText).toBeNull();
        errorText = screen.queryByTestId("MATH242 error-all errors");
        expect(errorText).toBeNull();
    });

    test("Students will get an error in the semester view when a course with an unsatisfied prerequisite or corequisite is added", () => {
        const defaultPlan = screen.getByRole("button", { name: "Default" });
        defaultPlan.click();
        const deletePlan = screen.getByRole("button", {
            name: "Delete Plan 🗑️"
        });
        deletePlan.click();
        const addEmpty = screen.getByRole("button", {
            name: /Add Empty ➕/i
        });
        addEmpty.click();
        const editButton = screen.getByRole("button", {
            name: /Edit Plan 🖉/i
        });
        editButton?.click();
        const addSemester = screen.getByRole("button", {
            name: /Add Semester ➕/i
        });
        addSemester.click();
        const createSemester = screen.getByRole("button", {
            name: /Create Semester/i
        });
        createSemester?.click();
        const seasonButton = screen.getAllByRole("combobox");
        userEvent.selectOptions(seasonButton[1], "Winter");
        createSemester?.click();
        const closeModal = screen.queryByRole("closebutton");
        closeModal?.click();
        const editSemester = screen.getByRole("button", {
            name: "Click to edit Fall 2022"
        });
        editSemester.click();
        const addCourse = screen.getByRole("button", {
            name: /Add Course/i
        });
        addCourse.click();
        let adding = screen.getByRole("button", {
            name: "Click to add CISC108"
        });
        adding.click();
        const filter = screen.getAllByRole("textbox");
        userEvent.type(filter[1], "242");
        adding = screen.getByRole("button", {
            name: "Click to add MATH242"
        });
        adding.click();
        //const fall2022Modal = screen.getByTestId("Fall 2022 modal");
        //const fall2022ModalText = fall2022Modal.innerHTML.toString();
        const errorTestID = screen.getByTestId("semester-error-test");
        const errorText = errorTestID.innerHTML.toString();
        expect(errorText).toMatch(
            "Errors with the following courses: CISC108, MATH242"
        );
        //const errorText = screen.queryByTestId(
        //    "semester errrors: CISC108,MATH242"
        //);
        //expect(errorText).toBeVisible();
        //errorText = screen.queryByTestId("MATH242 error-semester errors");
        //expect(errorText).not.toBeNull();
        /*const closeModal2 = screen.queryByRole("closebutton");
        closeModal2?.click();
        editSemester = screen.getByRole("button", {
            name: "Click to edit Winter 2022"
        });
        editSemester.click();
        addCourse = screen.getByRole("button", {
            name: /Add Course/i
        });
        addCourse.click();
        filter = screen.getAllByRole("textbox");
        userEvent.type(filter[2], "241");
        adding = screen.getByRole("button", {
            name: "Click to add MATH241"
        });
        adding.click();
        const closeModal3 = screen.queryByRole("closebutton");
        closeModal3?.click();
        editSemester = screen.getByRole("button", {
            name: "Click to edit Fall 2022"
        });
        editSemester.click();
        errorText = screen.queryByTestId("CISC108 error-all errors");
        expect(errorText).toBeNull();
        errorText = screen.queryByTestId("MATH242 error-all errors");
        expect(errorText).toBeNull();*/
    });

    test("Modify degree plan name", () => {
        const degreeButton = screen.getByRole("button", {
            name: "Default"
        });
        degreeButton.click();
        const editPlanButton = screen.getByRole("button", {
            name: /Edit Plan 🖉/i
        });
        editPlanButton.click();

        const nameBox = screen.getByTestId("degree-plan-name-box");
        userEvent.type(nameBox, "Plan 1");

        const stopEditButton = screen.getByRole("button", {
            name: /Stop Editing 🛑/i
        });
        stopEditButton.click();

        const text = screen.queryByText("Plan 1");
        expect(text).toBeVisible();
    });

    test("Modify degree plan start year", () => {
        const degreeButton = screen.getByRole("button", {
            name: "Default"
        });
        degreeButton.click();
        const editPlanButton = screen.getByRole("button", {
            name: /Edit Plan 🖉/i
        });
        editPlanButton.click();

        const nameBox = screen.getByTestId("start-year-box");
        userEvent.selectOptions(nameBox, "2018");

        const updateStartButton = screen.getByRole("button", {
            name: /Update Start Year/i
        });
        updateStartButton.click();

        const text = screen.queryByText("Fall 2018");
        const text2 = screen.queryByText("Spring 2019");
        expect(text).toBeVisible();
        expect(text2).toBeVisible();
    });
});
