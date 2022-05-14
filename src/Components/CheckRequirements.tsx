import React, { useState } from "react";
import "../App.css";
import { Degree } from "../Interfaces/Degree";
import { Course } from "../Interfaces/Course";
import { Semester } from "../Interfaces/Semester";
import { Button } from "react-bootstrap";

export function CheckRequirements({
    degree,
    concentration
}: {
    degree: Degree;
    concentration: string;
}): JSX.Element {
    const [check, setCheck] = useState<boolean>(false);
    const reqsBA = [
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

    const reqsAI = [
        "ENGL110",
        "FYS",
        "DLE",
        "Multicultural",
        "CAH",
        "HCC",
        "SBS",
        "SWR",
        "Science",
        "Breadth",
        "Breadth300+",
        "Capstone",
        "CISC108",
        "CISC181",
        "CISC210",
        "CISC220",
        "CISC260",
        "CISC275",
        "CISC303",
        "CISC320",
        "CISC355",
        "CISC304",
        "CISC442",
        "CISC481",
        "CISC483",
        "CISC484",
        "Probability/Statistics",
        "Systems",
        "MATH210",
        "MATH241"
    ];

    const reqsBio = [
        "ENGL110",
        "FYS",
        "DLE",
        "Multicultural",
        "CAH",
        "HCC",
        "SBS",
        "SWR",
        "Science",
        "Breadth",
        "Breadth300+",
        "Capstone",
        "CISC108",
        "CISC181",
        "CISC210",
        "CISC220",
        "CISC260",
        "CISC275",
        "CISC303",
        "CISC320",
        "CISC355",
        "BISC207",
        "BISC208",
        "BISC401",
        "CHEM103",
        "CHEM133",
        "CHEM104",
        "CHEM134",
        "CISC372",
        "CISC436",
        "Organic Chemistry",
        "MATH210",
        "MATH241",
        "MATH242",
        "MATH349",
        "Probability/Statistics",
        "Data Analysis"
    ];

    const reqsCyber = [
        "ENGL110",
        "FYS",
        "DLE",
        "Multicultural",
        "CAH",
        "HCC",
        "SBS",
        "SWR",
        "Science",
        "Breadth",
        "Breadth300+",
        "Capstone",
        "CISC108",
        "CISC181",
        "CISC210",
        "CISC220",
        "CISC260",
        "CISC275",
        "CISC303",
        "CISC320",
        "CISC355",
        "MATH210",
        "MATH241",
        "CISC361",
        "CISC372",
        "CISC450",
        "CISC464",
        "CPEG465",
        "CPEG494",
        "Probability/Statistics",
        "Advanced Cybersecurity"
    ];

    const reqsData = [
        "ENGL110",
        "FYS",
        "DLE",
        "Multicultural",
        "CAH",
        "HCC",
        "SBS",
        "SWR",
        "Science",
        "Breadth",
        "Breadth300+",
        "Capstone",
        "CISC108",
        "CISC181",
        "CISC210",
        "CISC220",
        "CISC260",
        "CISC275",
        "CISC303",
        "CISC320",
        "CISC355",
        "CISC304",
        "CISC372",
        "CISC437",
        "CISC481",
        "MATH205",
        "MATH210",
        "MATH241",
        "MATH242",
        "MATH243",
        "MATH349",
        "Data Analysis",
        "Advanced Math"
    ];

    const reqsPerf = [
        "ENGL110",
        "FYS",
        "DLE",
        "Multicultural",
        "CAH",
        "HCC",
        "SBS",
        "SWR",
        "Science",
        "Breadth",
        "Breadth300+",
        "Capstone",
        "CISC108",
        "CISC181",
        "CISC210",
        "CISC220",
        "CISC260",
        "CISC275",
        "CISC303",
        "CISC320",
        "CISC355",
        "CISC360",
        "CISC361",
        "CISC372",
        "CISC450",
        "CISC471",
        "MATH210",
        "MATH241",
        "MATH242",
        "MATH243",
        "MATH351 (Math track)",
        "MATH428 (Math track)",
        "Probability/Statistics (Math track)",
        "CISC437 (Data track)",
        "MATH350 (Data track)",
        "MATH450 (Data track)",
        "Data Analysis (Data track)"
    ];

    const reqsSystems = [
        "ENGL110",
        "FYS",
        "DLE",
        "Multicultural",
        "CAH",
        "HCC",
        "SBS",
        "SWR",
        "Science",
        "Breadth",
        "Breadth300+",
        "Capstone",
        "CISC108",
        "CISC181",
        "CISC210",
        "CISC220",
        "CISC260",
        "CISC275",
        "CISC303",
        "CISC320",
        "CISC355",
        "CISC360",
        "CISC361",
        "CISC372",
        "CISC450",
        "CISC471",
        "MATH210",
        "MATH241",
        "Probability/Statistics",
        "Security",
        "Advanced Systems"
    ];

    const reqsTheory = [
        "ENGL110",
        "FYS",
        "DLE",
        "Multicultural",
        "CAH",
        "HCC",
        "SBS",
        "SWR",
        "Science",
        "Breadth",
        "Breadth300+",
        "Capstone",
        "CISC108",
        "CISC181",
        "CISC210",
        "CISC220",
        "CISC260",
        "CISC275",
        "CISC303",
        "CISC320",
        "CISC355",
        "CISC304",
        "CISC401",
        "MATH210",
        "MATH241",
        "MATH242",
        "MATH349",
        "Probability/Statistics",
        "Discrete track",
        "Continuous track"
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
    const CISC303 = 3;
    const CISC320 = 3;
    const CISC355 = 3;
    const CISC304 = 3;
    const CISC442 = 3;
    const CISC481 = 3;
    const CISC483 = 3;
    const CISC484 = 3;
    const BISC207 = 4;
    const BISC208 = 4;
    const BISC401 = 3;
    const CHEM103 = 3;
    const CHEM104 = 3;
    const CHEM133 = 1;
    const CHEM134 = 1;
    const CISC372 = 3;
    const CISC436 = 3;
    const CISC437 = 3;
    const CISC360 = 3;
    const CISC361 = 3;
    const CISC401 = 3;
    const CISC471 = 3;
    const CISC450 = 3;
    const CISC464 = 3;
    const CPEG465 = 3;
    const CPEG494 = 3;

    const STAT = 3;
    const SYSTEM = 3;
    const DATA = 3;
    const ORGANIC = 4;
    const CYBER = 6;
    const MATH = 3;
    const SECURITY = 3;
    const SYSTEMS = 6;
    const DISCRETE = 12;
    const CONTINUOUS = 12;

    const MATH205 = 3;
    const MATH210 = 3;
    const MATH241 = 4;
    const MATH242 = 4;
    const MATH243 = 4;
    const MATH349 = 3;
    const MATH350 = 3;
    const MATH351 = 3;
    const MATH428 = 3;
    const MATH450 = 3;

    const CAPSTONE = 3;
    const SCIENCEBS = 8;
    const BREADTHBS = 21;
    const BREADTH300BS = 6;
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

    function unmetRequirementsAI(): number[] {
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
        const BreadthCourses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("Breadth")
        );
        const Breadth300Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("BREADTH300+")
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
        const CISC303Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC303")
        );
        const CISC320Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC320")
        );
        const CISC355Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC355")
        );
        const CISC304Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC304")
        );
        const CISC442Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC442")
        );
        const CISC481Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC481")
        );
        const CISC483Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC483")
        );
        const CISC484Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC484")
        );
        const StatCourses = allCoursesInPlan.filter((course: Course): boolean =>
            course.reqsSatisfied.includes("Statistics")
        );
        const SystemsCourses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("Systems")
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
        const BreadthCredits = BreadthCourses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const Breadth300Credits = Breadth300Courses.reduce(
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
        const CISC303Credits = CISC303Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC320Credits = CISC320Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC355Credits = CISC355Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC304Credits = CISC304Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC442Credits = CISC442Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC481Credits = CISC481Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC483Credits = CISC483Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC484Credits = CISC484Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const StatisticsCredits = StatCourses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const SystemsCredits = SystemsCourses.reduce(
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
            SCIENCEBS - ScienceCredits,
            BREADTHBS - BreadthCredits,
            BREADTH300BS - Breadth300Credits,
            CAPSTONE - CapstoneCredits,
            CISC108 - CISC108Credits,
            CISC181 - CISC181Credits,
            CISC210 - CISC210Credits,
            CISC220 - CISC220Credits,
            CISC260 - CISC260Credits,
            CISC275 - CISC275Credits,
            CISC303 - CISC303Credits,
            CISC320 - CISC320Credits,
            CISC355 - CISC355Credits,
            CISC304 - CISC304Credits,
            CISC442 - CISC442Credits,
            CISC481 - CISC481Credits,
            CISC483 - CISC483Credits,
            CISC484 - CISC484Credits,
            STAT - StatisticsCredits,
            SYSTEM - SystemsCredits,
            MATH210 - MATH210Credits,
            MATH241 - MATH241Credits
        ];

        return netCredits;
    }
    function unmetRequirementsBio(): number[] {
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
        const BreadthCourses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("Breadth")
        );
        const Breadth300Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("BREADTH300+")
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
        const CISC303Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC303")
        );
        const CISC320Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC320")
        );
        const CISC355Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC355")
        );
        const BISC207Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("BISC207")
        );
        const BISC208Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("BISC208")
        );
        const BISC401Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("BISC401")
        );
        const CHEM103Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CHEM103")
        );
        const CHEM133Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CHEM133")
        );
        const CHEM104Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CHEM104")
        );
        const CHEM134Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CHEM134")
        );
        const CISC372Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC372")
        );
        const CISC436Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC436")
        );
        const OrganicCourses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("Organic")
        );
        const MATH242Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("MATH242")
        );
        const MATH349Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("MATH349")
        );
        const StatCourses = allCoursesInPlan.filter((course: Course): boolean =>
            course.reqsSatisfied.includes("Statistics")
        );
        const DataCourses = allCoursesInPlan.filter((course: Course): boolean =>
            course.reqsSatisfied.includes("Data")
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
        const BreadthCredits = BreadthCourses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const Breadth300Credits = Breadth300Courses.reduce(
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
        const CISC303Credits = CISC303Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC320Credits = CISC320Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC355Credits = CISC355Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const BISC207Credits = BISC207Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const BISC208Credits = BISC208Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const BISC401Credits = BISC401Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CHEM103Credits = CHEM103Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CHEM133Credits = CHEM133Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CHEM104Credits = CHEM104Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CHEM134Credits = CHEM134Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC372Credits = CISC372Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC436Credits = CISC436Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const OrganicCredits = OrganicCourses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const StatCredits = StatCourses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const DataCredits = DataCourses.reduce(
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
        const MATH242Credits = MATH242Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const MATH349Credits = MATH349Courses.reduce(
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
            SCIENCEBS - ScienceCredits,
            BREADTHBS - BreadthCredits,
            BREADTH300BS - Breadth300Credits,
            CAPSTONE - CapstoneCredits,
            CISC108 - CISC108Credits,
            CISC181 - CISC181Credits,
            CISC210 - CISC210Credits,
            CISC220 - CISC220Credits,
            CISC260 - CISC260Credits,
            CISC275 - CISC275Credits,
            CISC303 - CISC303Credits,
            CISC320 - CISC320Credits,
            CISC355 - CISC355Credits,
            BISC207 - BISC207Credits,
            BISC208 - BISC208Credits,
            BISC401 - BISC401Credits,
            CHEM103 - CHEM103Credits,
            CHEM133 - CHEM133Credits,
            CHEM104 - CHEM104Credits,
            CHEM134 - CHEM134Credits,
            CISC372 - CISC372Credits,
            CISC436 - CISC436Credits,
            ORGANIC - OrganicCredits,
            MATH210 - MATH210Credits,
            MATH241 - MATH241Credits,
            MATH242 - MATH242Credits,
            MATH349 - MATH349Credits,
            STAT - StatCredits,
            DATA - DataCredits
        ];

        return netCredits;
    }
    function unmetRequirementsCyber(): number[] {
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
        const BreadthCourses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("Breadth")
        );
        const Breadth300Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("BREADTH300+")
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
        const CISC303Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC303")
        );
        const CISC320Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC320")
        );
        const CISC355Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC355")
        );
        const CISC361Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC361")
        );
        const CISC372Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC372")
        );
        const CISC450Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC450")
        );
        const CISC464Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC464")
        );
        const CPEG465Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CPEG465")
        );
        const CPEG494Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CPEG494")
        );
        const StatCourses = allCoursesInPlan.filter((course: Course): boolean =>
            course.reqsSatisfied.includes("Statistics")
        );
        const CyberCourses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("Cybersecurity")
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
        const BreadthCredits = BreadthCourses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const Breadth300Credits = Breadth300Courses.reduce(
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
        const CISC303Credits = CISC303Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC320Credits = CISC320Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC355Credits = CISC355Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC361Credits = CISC361Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC372Credits = CISC372Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC450Credits = CISC450Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC464Credits = CISC464Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CPEG465Credits = CPEG465Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CPEG494Credits = CPEG494Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const StatCredits = StatCourses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CyberCredits = CyberCourses.reduce(
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
            SCIENCEBS - ScienceCredits,
            BREADTHBS - BreadthCredits,
            BREADTH300BS - Breadth300Credits,
            CAPSTONE - CapstoneCredits,
            CISC108 - CISC108Credits,
            CISC181 - CISC181Credits,
            CISC210 - CISC210Credits,
            CISC220 - CISC220Credits,
            CISC260 - CISC260Credits,
            CISC275 - CISC275Credits,
            CISC303 - CISC303Credits,
            CISC320 - CISC320Credits,
            CISC355 - CISC355Credits,
            MATH210 - MATH210Credits,
            MATH241 - MATH241Credits,
            CISC361 - CISC361Credits,
            CISC372 - CISC372Credits,
            CISC450 - CISC450Credits,
            CISC464 - CISC464Credits,
            CPEG465 - CPEG465Credits,
            CPEG494 - CPEG494Credits,
            STAT - StatCredits,
            CYBER - CyberCredits
        ];

        return netCredits;
    }
    function unmetRequirementsData(): number[] {
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
        const BreadthCourses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("Breadth")
        );
        const Breadth300Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("BREADTH300+")
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
        const CISC303Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC303")
        );
        const CISC320Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC320")
        );
        const CISC355Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC355")
        );
        const CISC304Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC304")
        );
        const CISC372Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC372")
        );
        const CISC437Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC437")
        );
        const CISC481Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC481")
        );
        const MATH205Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("MATH205")
        );
        const MATH242Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("MATH242")
        );
        const MATH243Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("MATH243")
        );
        const MATH349Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("MATH349")
        );
        const DataCourses = allCoursesInPlan.filter((course: Course): boolean =>
            course.reqsSatisfied.includes("Data")
        );
        const MathCourses = allCoursesInPlan.filter((course: Course): boolean =>
            course.reqsSatisfied.includes("Math")
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
        const BreadthCredits = BreadthCourses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const Breadth300Credits = Breadth300Courses.reduce(
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
        const CISC303Credits = CISC303Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC320Credits = CISC320Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC355Credits = CISC355Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC304Credits = CISC304Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC372Credits = CISC372Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC437Credits = CISC437Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC481Credits = CISC481Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const MATH205Credits = MATH205Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const MATH242Credits = MATH242Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const MATH243Credits = MATH243Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const MATH349Credits = MATH349Courses.reduce(
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
        const DataCredits = DataCourses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const MathCredits = MathCourses.reduce(
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
            SCIENCEBS - ScienceCredits,
            BREADTHBS - BreadthCredits,
            BREADTH300BS - Breadth300Credits,
            CAPSTONE - CapstoneCredits,
            CISC108 - CISC108Credits,
            CISC181 - CISC181Credits,
            CISC210 - CISC210Credits,
            CISC220 - CISC220Credits,
            CISC260 - CISC260Credits,
            CISC275 - CISC275Credits,
            CISC303 - CISC303Credits,
            CISC320 - CISC320Credits,
            CISC355 - CISC355Credits,
            CISC304 - CISC304Credits,
            CISC372 - CISC372Credits,
            CISC437 - CISC437Credits,
            CISC481 - CISC481Credits,
            MATH205 - MATH205Credits,
            MATH210 - MATH210Credits,
            MATH241 - MATH241Credits,
            MATH242 - MATH242Credits,
            MATH243 - MATH243Credits,
            MATH349 - MATH349Credits,
            DATA - DataCredits,
            MATH - MathCredits
        ];

        return netCredits;
    }
    function unmetRequirementsPerf(): number[] {
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
        const BreadthCourses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("Breadth")
        );
        const Breadth300Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("BREADTH300+")
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
        const CISC303Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC303")
        );
        const CISC320Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC320")
        );
        const CISC355Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC355")
        );
        const CISC360Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC360")
        );
        const CISC361Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC361")
        );
        const CISC372Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC372")
        );
        const CISC450Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC450")
        );
        const CISC471Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC471")
        );
        const MATH242Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("MATH242")
        );
        const MATH243Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("MATH243")
        );
        const MATH351Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("MATH351")
        );
        const MATH428Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("MATH428")
        );
        const StatCourses = allCoursesInPlan.filter((course: Course): boolean =>
            course.reqsSatisfied.includes("Statistics")
        );
        const CISC437Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC437")
        );
        const MATH350Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("MATH350")
        );
        const MATH450Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("MATH450")
        );
        const DataCourses = allCoursesInPlan.filter((course: Course): boolean =>
            course.reqsSatisfied.includes("Data")
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
        const BreadthCredits = BreadthCourses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const Breadth300Credits = Breadth300Courses.reduce(
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
        const CISC303Credits = CISC303Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC320Credits = CISC320Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC355Credits = CISC355Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC360Credits = CISC360Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC361Credits = CISC361Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC372Credits = CISC372Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC450Credits = CISC450Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC471Credits = CISC471Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const MATH242Credits = MATH242Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const MATH243Credits = MATH243Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const MATH351Credits = MATH351Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const MATH428Credits = MATH428Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const StatCredits = StatCourses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC437Credits = CISC437Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const MATH350Credits = MATH350Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const MATH450Credits = MATH450Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const DataCredits = DataCourses.reduce(
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
            SCIENCEBS - ScienceCredits,
            BREADTHBS - BreadthCredits,
            BREADTH300BS - Breadth300Credits,
            CAPSTONE - CapstoneCredits,
            CISC108 - CISC108Credits,
            CISC181 - CISC181Credits,
            CISC210 - CISC210Credits,
            CISC220 - CISC220Credits,
            CISC260 - CISC260Credits,
            CISC275 - CISC275Credits,
            CISC303 - CISC303Credits,
            CISC320 - CISC320Credits,
            CISC355 - CISC355Credits,
            CISC360 - CISC360Credits,
            CISC361 - CISC361Credits,
            CISC372 - CISC372Credits,
            CISC450 - CISC450Credits,
            CISC471 - CISC471Credits,
            MATH210 - MATH210Credits,
            MATH241 - MATH241Credits,
            MATH242 - MATH242Credits,
            MATH243 - MATH243Credits,
            MATH351 - MATH351Credits,
            MATH428 - MATH428Credits,
            STAT - StatCredits,
            CISC437 - CISC437Credits,
            MATH350 - MATH350Credits,
            MATH450 - MATH450Credits,
            DATA - DataCredits
        ];

        return netCredits;
    }
    function unmetRequirementsSystems(): number[] {
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
        const BreadthCourses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("Breadth")
        );
        const Breadth300Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("BREADTH300+")
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
        const CISC303Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC303")
        );
        const CISC320Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC320")
        );
        const CISC355Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC355")
        );
        const CISC360Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC360")
        );
        const CISC361Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC361")
        );
        const CISC372Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC372")
        );
        const CISC450Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC450")
        );
        const CISC471Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC471")
        );
        const StatCourses = allCoursesInPlan.filter((course: Course): boolean =>
            course.reqsSatisfied.includes("Statistics")
        );
        const SecurityCourses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("Cybersecurity")
        );
        const SystemsCourses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("Systems")
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
        const BreadthCredits = BreadthCourses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const Breadth300Credits = Breadth300Courses.reduce(
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
        const CISC303Credits = CISC303Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC320Credits = CISC320Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC355Credits = CISC355Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC360Credits = CISC360Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC361Credits = CISC361Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC372Credits = CISC372Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC450Credits = CISC450Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC471Credits = CISC471Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const StatCredits = StatCourses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const SecurityCredits = SecurityCourses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const SystemsCredits = SystemsCourses.reduce(
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
            SCIENCEBS - ScienceCredits,
            BREADTHBS - BreadthCredits,
            BREADTH300BS - Breadth300Credits,
            CAPSTONE - CapstoneCredits,
            CISC108 - CISC108Credits,
            CISC181 - CISC181Credits,
            CISC210 - CISC210Credits,
            CISC220 - CISC220Credits,
            CISC260 - CISC260Credits,
            CISC275 - CISC275Credits,
            CISC303 - CISC303Credits,
            CISC320 - CISC320Credits,
            CISC355 - CISC355Credits,
            CISC360 - CISC360Credits,
            CISC361 - CISC361Credits,
            CISC372 - CISC372Credits,
            CISC450 - CISC450Credits,
            CISC471 - CISC471Credits,
            MATH210 - MATH210Credits,
            MATH241 - MATH241Credits,
            STAT - StatCredits,
            SECURITY - SecurityCredits,
            SYSTEMS - SystemsCredits
        ];

        return netCredits;
    }
    function unmetRequirementsTheory(): number[] {
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
        const BreadthCourses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("Breadth")
        );
        const Breadth300Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("BREADTH300+")
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
        const CISC303Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC303")
        );
        const CISC320Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC320")
        );
        const CISC355Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC355")
        );
        const CISC304Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC304")
        );
        const CISC401Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("CISC401")
        );
        const MATH242Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("MATH242")
        );
        const MATH349Courses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("MATH349")
        );
        const StatCourses = allCoursesInPlan.filter((course: Course): boolean =>
            course.reqsSatisfied.includes("Statistics")
        );
        const DiscreteCourses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("Discrete")
        );
        const ContinuousCourses = allCoursesInPlan.filter(
            (course: Course): boolean =>
                course.reqsSatisfied.includes("Continuous")
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
        const BreadthCredits = BreadthCourses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const Breadth300Credits = Breadth300Courses.reduce(
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
        const CISC303Credits = CISC303Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC320Credits = CISC320Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC355Credits = CISC355Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC304Credits = CISC304Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const CISC401Credits = CISC401Courses.reduce(
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
        const MATH242Credits = MATH242Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const MATH349Credits = MATH349Courses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const StatCredits = StatCourses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const DiscreteCredits = DiscreteCourses.reduce(
            (credits: number, course: Course) => credits + course.credits,
            0
        );
        const ContinuousCredits = ContinuousCourses.reduce(
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
            SCIENCEBS - ScienceCredits,
            BREADTHBS - BreadthCredits,
            BREADTH300BS - Breadth300Credits,
            CAPSTONE - CapstoneCredits,
            CISC108 - CISC108Credits,
            CISC181 - CISC181Credits,
            CISC210 - CISC210Credits,
            CISC220 - CISC220Credits,
            CISC260 - CISC260Credits,
            CISC275 - CISC275Credits,
            CISC303 - CISC303Credits,
            CISC320 - CISC320Credits,
            CISC355 - CISC355Credits,
            CISC304 - CISC304Credits,
            CISC401 - CISC401Credits,
            MATH210 - MATH210Credits,
            MATH241 - MATH241Credits,
            MATH242 - MATH242Credits,
            MATH349 - MATH349Credits,
            STAT - StatCredits,
            DISCRETE - DiscreteCredits,
            CONTINUOUS - ContinuousCredits
        ];

        return netCredits;
    }

    function printMissing(): string[] {
        let netCredits = unmetRequirements();
        const netTotal = TOTAL - totalCredits;
        let retString = netCredits.map((credits: number, ind: number): string =>
            credits > 0
                ? "Warning: You are missing " +
                  netCredits[ind] +
                  " credits as part of the " +
                  reqsBA[ind] +
                  " requirement."
                : ""
        );
        if (concentration === "Artificial Intelligence and Robotics (BS)") {
            netCredits = unmetRequirementsAI();
            retString = netCredits.map((credits: number, ind: number): string =>
                credits > 0
                    ? "Warning: You are missing " +
                      netCredits[ind] +
                      " credits as part of the " +
                      reqsAI[ind] +
                      " requirement."
                    : ""
            );
        } else if (concentration === "Bioinformatics (BS)") {
            netCredits = unmetRequirementsBio();
            retString = netCredits.map((credits: number, ind: number): string =>
                credits > 0
                    ? "Warning: You are missing " +
                      netCredits[ind] +
                      " credits as part of the " +
                      reqsBio[ind] +
                      " requirement."
                    : ""
            );
        } else if (concentration === "Cybersecurity (BS)") {
            netCredits = unmetRequirementsCyber();
            retString = netCredits.map((credits: number, ind: number): string =>
                credits > 0
                    ? "Warning: You are missing " +
                      netCredits[ind] +
                      " credits as part of the " +
                      reqsCyber[ind] +
                      " requirement."
                    : ""
            );
        } else if (concentration === "Data Science (BS)") {
            netCredits = unmetRequirementsData();
            retString = netCredits.map((credits: number, ind: number): string =>
                credits > 0
                    ? "Warning: You are missing " +
                      netCredits[ind] +
                      " credits as part of the " +
                      reqsData[ind] +
                      " requirement."
                    : ""
            );
        } else if (concentration === "High Performance Computing (BS)") {
            netCredits = unmetRequirementsPerf();
            retString = netCredits.map((credits: number, ind: number): string =>
                credits > 0
                    ? "Warning: You are missing " +
                      netCredits[ind] +
                      " credits as part of the " +
                      reqsPerf[ind] +
                      " requirement."
                    : ""
            );
        } else if (concentration === "Systems and Networks (BS)") {
            netCredits = unmetRequirementsSystems();
            retString = netCredits.map((credits: number, ind: number): string =>
                credits > 0
                    ? "Warning: You are missing " +
                      netCredits[ind] +
                      " credits as part of the " +
                      reqsSystems[ind] +
                      " requirement."
                    : ""
            );
        } else if (concentration === "Theory and Computation (BS)") {
            netCredits = unmetRequirementsTheory();
            retString = netCredits.map((credits: number, ind: number): string =>
                credits > 0
                    ? "Warning: You are missing " +
                      netCredits[ind] +
                      " credits as part of the " +
                      reqsTheory[ind] +
                      " requirement."
                    : ""
            );
        }
        if (netTotal > 0) {
            retString = [
                ...retString,
                "Warning: You are missing " +
                    netTotal.toString() +
                    " credits to satisfy your total credits."
            ];
        }
        retString = retString.filter(
            (statement: string): boolean => statement !== ""
        );
        return retString;
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
            <div hidden={!check}>{printMissing().join("\r\n")}</div>
        </div>
    );
}
