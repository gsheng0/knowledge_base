
import React from "react";
import "../index.css";

function Content (props) {
    console.log("[Content] rendering......");
    console.log(props);

    return (
        <div className="content">
            {props.textContent && props.textContent.substring(0,128)}
        </div>
    )
}

export default Content;