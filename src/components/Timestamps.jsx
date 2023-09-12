import React from "react";
import "../index.css";

function Timestamps (props) {
    console.log("[Title] rendering......");
    console.log(props);

    return (
        <div className="timeStamps">
            <h6>Created: {props.createOn}</h6>
            <h6>Last Updated: {props.updateOn}</h6>
        </div>
    )
}

export default Timestamps;