import React from "react";
import "./App.css";
import { CourseState } from "./Components/course_state";

//const degrees = PlanData.map((degree): Degree => degree as Degree);

function App(): JSX.Element {
    return (
        <div className="App">
            <CourseState></CourseState>
        </div>
    );
}

export default App;
