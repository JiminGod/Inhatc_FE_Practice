import React, { Component } from 'react';
import Grade1 from "./Grade1";
import Grade2 from "./Grade2";
import Grade3 from "./Grade3";

class GradeReport extends Component {
    render() {
        return (
            <div>
                <Grade1/>
                <Grade2/>
                <Grade3/>
            </div>
        );
    }
}

export default GradeReport;
