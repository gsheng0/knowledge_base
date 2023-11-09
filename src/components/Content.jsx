
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
        <div>
            <div className="ml-2 mb-1 font-semibold">Content (1st 128 characters): </div>
            <div className="ml-2 bg-yellow-100">
            {props.textContent && getShortContent(props.textContent)}
            </div>
        </div>
    )
}

export default Content;