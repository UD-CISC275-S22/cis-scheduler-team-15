import { Degree } from "../Interfaces/degree";
import { Semester } from "../Interfaces/semester";
import { Course } from "../Interfaces/course";

export function CheckSemesters({
    courses,
    degree,
    editDegree
}: {
    courses: Course[];
    degree: Degree;
    editDegree: (degreeID: number, newDegree: Degree) => void;
}) {
    function assignSeasonNumber(season: string): number {
        if (season === "Winter") {
            return 1;
        } else if (season === "Spring") {
            return 2;
        } else if (season === "Summer") {
            return 3;
        } else {
            return 4;
        }
    }

    function checkSeasonBefore(
        semester: Semester,
        checkSeason: string
    ): boolean {
        const currentSeasonNum = assignSeasonNumber(semester.season);
        const checkSeasonNum = assignSeasonNumber(checkSeason);
        return checkSeasonNum < currentSeasonNum;
    }

    function checkSemesterBefore(
        semester: Semester,
        checkSemester: Semester
    ): boolean {
        if (checkSemester.year < semester.year) {
            return true;
        } else if (checkSemester.year === semester.year) {
            return checkSeasonBefore(semester, checkSemester.season);
        } else {
            return false;
        }
    }
    function checkPreReqs(semester: Semester): boolean[][] {
        const semesterCourses = semester.courses;
        const semestersBefore = degree.semesters.filter(
            (checkSemester: Semester): boolean =>
                checkSemesterBefore(semester, checkSemester)
        );
        const allCoursesBefore = semestersBefore.reduce(
            (allCourses: Course[], currentSemester: Semester) => [
                ...allCourses,
                ...currentSemester.courses
            ],
            []
        );
        const allCourseIDBefore = allCoursesBefore.map(
            (course: Course): number => course.courseID
        );
        const semesterPrereqIDs = semesterCourses.map(
            (course: Course): number[] => course.preReqs
        );
        const prereqBool = semesterPrereqIDs.map(
            (prereqs: number[]): boolean[] =>
                prereqs.map((prereq: number): boolean =>
                    allCourseIDBefore.includes(prereq)
                )
        );
        return prereqBool;
    }
    function checkCoReqs(semester: Semester): boolean[][] {
        const semesterCourses = semester.courses;
        const semestersBeforeAndCurrent = [
            ...degree.semesters.filter((checkSemester: Semester): boolean =>
                checkSemesterBefore(semester, checkSemester)
            ),
            semester
        ];
        const allCoursesBeforeAndCurrent = semestersBeforeAndCurrent.reduce(
            (allCourses: Course[], currentSemester: Semester) => [
                ...allCourses,
                ...currentSemester.courses
            ],
            []
        );
        const allCourseIDBeforeAndCurrent = allCoursesBeforeAndCurrent.map(
            (course: Course): number => course.courseID
        );
        const semesterCoreqIDs = semesterCourses.map(
            (course: Course): number[] => course.coReqs
        );
        const coreqBool = semesterCoreqIDs.map((coreqs: number[]): boolean[] =>
            coreqs.map((coreq: number): boolean =>
                allCourseIDBeforeAndCurrent.includes(coreq)
            )
        );
        return coreqBool;
    }
    function findPrereqs(
        semester: Semester,
        prereqSatisfied: boolean[],
        index: number
    ): string {
        const prereqIDs = semester.courses[index].preReqs;
        const unsatisfiedPrereqIDs = prereqIDs.filter(
            (ID: number, index: number): boolean => !prereqSatisfied[index]
        );

        return unsatisfiedPrereqIDs
            .map(
                (id: number) =>
                    courses.filter(
                        (course: Course): boolean => course.courseID === id
                    )[0].listing
            )
            .join(", ");
    }
    function findCoreqs(
        semester: Semester,
        coreqSatisfied: boolean[],
        index: number
    ): string {
        const coreqIDs = semester.courses[index].coReqs;
        const unsatisfiedCoreqIDs = coreqIDs.filter(
            (ID: number, index: number): boolean => !coreqSatisfied[index]
        );
        return unsatisfiedCoreqIDs
            .map(
                (id: number) =>
                    courses.filter(
                        (course: Course): boolean => course.courseID === id
                    )[0].listing
            )
            .join(", ");
    }

    function setCourseError(
        semester: Semester,
        prereqsBool: boolean[],
        coreqsBool: boolean[],
        index: number
    ): string {
        let errorMessage = "";
        if (!prereqsBool.every((currentBool) => currentBool)) {
            errorMessage =
                errorMessage +
                "There are unsatisfied prerequisites for this course. Unsatisfied prerequisite(s): " +
                findPrereqs(semester, prereqsBool, index) +
                "\n";
        }
        if (!coreqsBool.every((currentBool) => currentBool)) {
            errorMessage =
                errorMessage +
                "There are unsatisfied corequisites for this course. Unsatisfied corequisite(s): " +
                findCoreqs(semester, coreqsBool, index);
        }
        return errorMessage;
    }
    const newSemesters = degree.semesters.map((semester: Semester) => {
        const prereqBool = checkPreReqs(semester);
        const coreqBool = checkCoReqs(semester);
        const newErrors = [
            ...Array.from(Array(semester.courses.length).keys())
        ].map((index: number): string =>
            setCourseError(semester, prereqBool[index], coreqBool[index], index)
        );

        const semesterWithError: Semester = {
            semesterID: semester.semesterID,
            season: semester.season,
            year: semester.year,
            courses: semester.courses,
            errors: [...newErrors]
        };
        return semesterWithError;
    });
    const newDegree: Degree = { ...degree, semesters: newSemesters };
    editDegree(degree.degreeID, newDegree);
}
