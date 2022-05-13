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

    // Henry test("Degree requirements change when concentration changes", () => {});

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
        ).toMatch("Degree Requirements Satified: Science, BISC207, FYS");

        const cAccordian = screen.queryByTestId("edit-coll-req-accordian");
        const cOptions = screen.queryAllByTestId("edit-coll-req-option");
        cAccordian?.click();
        cOptions[0].click();
        expect(
            firstAccordian[0].innerHTML.toString().replace(/<[^>]+>/g, "")
        ).toMatch("Degree Requirements Satified: Science, BISC207, FYS, FL");

        const mAccordian = screen.queryByTestId("edit-major-req-accordian");
        const mOptions = screen.queryAllByTestId("edit-major-req-option");
        mAccordian?.click();
        mOptions[0].click();
        expect(
            firstAccordian[0].innerHTML.toString().replace(/<[^>]+>/g, "")
        ).toMatch("Degree Requirements Satified: Science, BISC207, FYS, FL");
        mOptions[1].click();
        expect(
            firstAccordian[0].innerHTML.toString().replace(/<[^>]+>/g, "")
        ).toMatch(
            "Degree Requirements Satified: Science, BISC207, FYS, FL, CISC108, CISC181"
        );
    });

    test("Students can reset course's info back to default", () => {
        const courseListButton = screen.getByRole("button", {
            name: /Move to Course List 📄/i
        });
        courseListButton.click();

        const text1 = screen.queryAllByText(
            "BISC207: Introduction to Biology I"
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
        ).toMatch(
            "Degree Requirements Satified: Science, BISC207, FYS, FL, CISC181"
        );

        resetButton.click();
        expect(
            firstAccordian[0].innerHTML.toString().replace(/<[^>]+>/g, "")
        ).toMatch("Credit(s): 4");
        text = screen.queryAllByText("BISC207: Introduction to Biology I");
        expect(
            firstAccordian[0].innerHTML.toString().replace(/<[^>]+>/g, "")
        ).toMatch("Degree Requirements Satified: Science, BISC207");
        expect(text[0]).toBeVisible();
    });
    test("Update courses in existing degree plans when course list is updated", () => {
        const courseListButton = screen.getByRole("button", {
            name: /Move to Course List 📄/i
        });
        courseListButton.click();
        const filterBox = screen.getByTestId("course-filter");
        userEvent.type(filterBox, "CISC");
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
        ).toMatch("Pre-Requisite Courses: BISC208");
        addPreReqButton.click();
        expect(
            firstAccordian[0].innerHTML.toString().replace(/<[^>]+>/g, "")
        ).toMatch("Course already a PreReq");

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
        ).toMatch("Co-Requisite Courses: CHEM103");

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
        ).toMatch("Co-Requisite Courses: CHEM103");
        expect(
            firstAccordian[0].innerHTML.toString().replace(/<[^>]+>/g, "")
        ).toMatch("Course not one of the CoReqs");

        const coReqOptionsAdd = screen.getAllByTestId("add-coReq");
        userEvent.selectOptions(coReqBox[2], coReqOptionsAdd[0]);
        addCoReqButton.click();
        expect(
            firstAccordian[0].innerHTML.toString().replace(/<[^>]+>/g, "")
        ).toMatch("Co-Requisite Courses: BISC208, CHEM103");
        addCoReqButton.click();
        expect(
            firstAccordian[0].innerHTML.toString().replace(/<[^>]+>/g, "")
        ).toMatch("Course already a CoReq");

        userEvent.selectOptions(coReqBox[3], coReqOptionsRem[0]);
        removeCoReqButton.click();
        expect(
            firstAccordian[0].innerHTML.toString().replace(/<[^>]+>/g, "")
        ).toMatch("Co-Requisite Courses: CHEM103");
    });

    test("Students can see a list of existing courses", () => {
        const courseListButton = screen.getByRole("button", {
            name: /Move to Course List 📄/i
        });
        courseListButton.click();

        const accordions = screen.queryAllByTestId("accordian-item", {});
        expect(accordions.length).toBe(98);
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
            "CISC118: Introduction to Biology I"
        );
        text1 = screen.queryAllByText("BISC207: Introduction to Biology I");
        expect(text1[0]).toBeUndefined();
        expect(text[0]).toBeVisible();
    });

    test("Student can edit the course title ", () => {
        const courseListButton = screen.getByRole("button", {
            name: /Move to Course List 📄/i
        });
        courseListButton.click();

        const filterBox = screen.getByTestId("course-filter");
        userEvent.type(filterBox, "CISC");

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
        expect(text[0]).toBeVisible();
        expect(text1[0]).toBeUndefined();
    });

    test("Student can edit credits of a course", () => {
        const courseListButton = screen.getByRole("button", {
            name: /Move to Course List 📄/i
        });
        courseListButton.click();

        const filterBox = screen.getByTestId("course-filter");
        userEvent.type(filterBox, "CISC");

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
    test("Student can filter the courses in the course list", () => {
        const courseListButton = screen.getByRole("button", {
            name: /Move to Course List 📄/i
        });
        courseListButton.click();

        const filterBox = screen.getByTestId("course-filter");
        userEvent.type(filterBox, "CISC");

        const accordions = screen.queryAllByTestId("accordian-item", {});
        expect(accordions.length).toBe(32);
    });
});
