import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

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
});
