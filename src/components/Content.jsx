
import React from "react";
import "../index.css";

function Content (props) {
    console.log("[Content] rendering......");
    console.log(props);

    function getShortContent(content) {
        // debugger
        const imgStartAt = content.indexOf("<img");
        let shortContent = "";
        if (imgStartAt > -1 && imgStartAt < 128) {
            shortContent = content.substring(0, imgStartAt + 32) + "...</img>";
        }
        else { 
            shortContent = content.substring(0, 128);
        }
        return shortContent;
        // return content.substring(0, 128);
    }

    return (
        <div className="content">
            {props.textContent && getShortContent(props.textContent)}
        </div>
    )
}

export default Content;