import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

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
    /*
    test("Students can insert a course in a semester", () => {});

    test("Students can clear out semesters in a plan", () => {});

    test("Students can clear out all the existing courses in a semester or clear out individual courses", () => {});
    */
});
