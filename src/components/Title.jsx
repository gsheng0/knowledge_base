import React from "react";
import "../index.css";
import { cardTitleClassName } from "../AppCss";

function Title ({title, status}) {
    console.log("[Title] rendering......");
    console.log({title, status});
    return (
        <div className={cardTitleClassName}>
            {title + " (" + status + ")"}
        </div>    
           
    )
}

export default Title;