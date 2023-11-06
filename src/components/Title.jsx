import React from "react";
import "../index.css";

function Title ({title, status}) {
    console.log("[Title] rendering......");
    console.log({title, status});
    return (
        <div className="ml-2 mr-2 mb-2 text-center font-extrabold text-blue-800 ">
            {title + " (" + status + ")"}
        </div>    
           
    )
}

export default Title;