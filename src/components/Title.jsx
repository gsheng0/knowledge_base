import React from "react";
import "../index.css";

function Title (prop) {
    console.log("[Title] rendering......");
    console.log(prop);
    return (
        <div className="title"><h4><b>{prop.title}</b>&nbsp;({prop.id})&nbsp;({prop.status})</h4></div>        
    )
}

export default Title;