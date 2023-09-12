
import React from "react";
import "../index.css";

function Content (props) {
    console.log("[Content] rendering......");
    console.log(props);

    return (
        <div className="content">
            <h5>{props.textContent && props.textContent.substring(0,64)}</h5>
        </div>
    )
}

export default Content;