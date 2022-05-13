import React, { useState } from "react";
import "../App.css";
import { Degree } from "../Interfaces/degree";
import { Course } from "../Interfaces/course";
import { Semester } from "../Interfaces/semester";
import { Button } from "react-bootstrap";

export function CheckRequirements({ degree }: { degree: Degree }): JSX.Element {
    const [check, setCheck] = useState<boolean>(false);
    const reqs = [
        "ENGL110",
        "FYS",
        "DLE",
        "Multicultural",
        "CAH",
        "HCC",
        "SBS",
        "SWR",
        "Science",
        "FL",
        "Breadth",
        "Capstone",
        "CISC108",
        "CISC181",
        "CISC210",
        "CISC220",
        "CISC260",
        "CISC275",
        "CISC300+",
        "MATH210",
        "MATH241"
    ];

    const E110 = 3;
    const FYS = 2;
    const DLE = 3;
    const MC = 3;
    const CAH = 6;
    const HCC = 6;
    const SBS = 6;
    const SWR = 3;
    const SCIENCE = 4;
    const LANG = 12;
    const BREADTH = 25;
    const CISC108 = 3;
    const CISC181 = 3;
    const CISC210 = 3;
    const CISC220 = 3;
    const CISC260 = 3;
    const CISC275 = 3;
    const CISC300 = 15;
    const MATH210 = 3;
    const MATH241 = 4;
    const CAPSTONE = 3;
    const TOTAL = 124;

    const allCoursesInPlan = degree.semesters.reduce(
        (allCourses: Course[], currentSemester: Semester) => [
            ...allCourses,
            ...currentSemester.courses
        ],
        []
    );
    const totalCredits = allCoursesInPlan.reduce(
        (credits: number, course: Course) => credits + course.credits,
        0
    );

    function unmetRequirements(): number[] {
        //Courses
        console.log(allCoursesInPlan);
        const E110Courses = allCoursesInPlan.filter((course: Course): boolean =>
            course.reqsSatisfied.includes("ENGL110")
        );
        const FYSCourses = allCoursesInPlan.filter((course: Course): boolean =>
            course.reqsSatisfied.includes("FYS")
        );
        const DLECourses = allCoursesInPlan.filter((course: Course): boolean =>
            course.reqsSatisfied.includes("DLE")
        );
        const MCCourses = allCoursesInPlan.filter((course: Course): boolean =>
            course.reqsSatisfied.includes("Multicultural")
        );
        const CAHCourses = allCoursesInPlan.filter((course: Course): boolean =>
            course.reqsSatisfied.includes("CAH")
        );
        const HCCCourses = allCoursesInPlan.filter((course: Course): boolean =>
            course.reqsSatisfied.includes("HCC")
        );
        const SBSCourses = allCoursesInPlan.filter((course: Course): boolean =>
            course.reqsSatisfied.includes("SBS")
        );
        const SWRCourses = allCoursesInPlan.filter((course: Course): boolean =>
            course.reqsSatisfied.includes("SWR")
        );
        const ScienceCourses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("Science")
        );
        const LangCourses = allCoursesInPlan.filter((course: Course): boolean =>
            course.reqsSatisfied.includes("FL")
        );
        const BreadthCourses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("Breadth")
        );
        const CISC108Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC108")
        );
        const CISC181Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC181")
        );
        const CISC210Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC210")
        );
        const CISC220Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC220")
        );
        const CISC260Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC260")
        );
        const CISC275Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC275")
        );
        const MATH210Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("MATH210")
        );
        const MATH241Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("MATH241")
        );
        const CISC300Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC300+")
        );
        const CapstoneCourses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("Capstone")
        );

        //Credits
        const E110Credits = E110Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const FYSCredits = FYSCourses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const DLECredits = DLECourses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const MCCredits = MCCourses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CAHCredits = CAHCourses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const HCCCredits = HCCCourses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const SBSCredits = SBSCourses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const SWRCredits = SWRCourses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const LangCredits = LangCourses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const BreadthCredits = BreadthCourses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const ScienceCredits = ScienceCourses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC108Credits = CISC108Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC181Credits = CISC181Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC210Credits = CISC210Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC220Credits = CISC220Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC260Credits = CISC260Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC275Credits = CISC275Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC300Credits = CISC300Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const MATH241Credits = MATH241Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const MATH210Credits = MATH210Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CapstoneCredits = CapstoneCourses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );

        const netCredits = [
            E110 - E110Credits,
            FYS - FYSCredits,
            DLE - DLECredits,
            MC - MCCredits,
            CAH - CAHCredits,
            HCC - HCCCredits,
            SBS - SBSCredits,
            SWR - SWRCredits,
            SCIENCE - ScienceCredits,
            LANG - LangCredits,
            BREADTH - BreadthCredits,
            CAPSTONE - CapstoneCredits,
            CISC108 - CISC108Credits,
            CISC181 - CISC181Credits,
            CISC210 - CISC210Credits,
            CISC220 - CISC220Credits,
            CISC260 - CISC260Credits,
            CISC275 - CISC275Credits,
            CISC300 - CISC300Credits,
            MATH210 - MATH210Credits,
            MATH241 - MATH241Credits
        ];

        return netCredits;
    }

    function printMissing(): string[] {
        const netCredits = unmetRequirements();
        const netTotal = TOTAL - totalCredits;
        let retString = netCredits.map((credits: number, ind: number): string =>
            credits > 0
                ? "Warning: You are missing " +
                  netCredits[ind] +
                  " credits as part of the " +
                  reqs[ind] +
                  " requirement."
                : ""
        );
        if (netTotal > 0) {
            retString = [
                ...retString,
                "Warning: You are missing " +
                    netTotal.toString() +
                    " credits to satisfy your total credits."
            ];
        }
        return retString.filter(
            (statement: string): boolean => statement !== ""
        );
    }

    return (
        <div>
            <Button
                onClick={() => setCheck(!check)}
                variant={check ? "warning" : "primary"}
                style={{ margin: "5px" }}
            >
                {!check ? "⚠ Check Requirements ⚠" : "🛑 Stop Checking 🛑"}
            </Button>
            <div hidden={!check}>
                <div className="newLine">{printMissing().join("\r\n")}</div>
            </div>
        </div>
    );
}
