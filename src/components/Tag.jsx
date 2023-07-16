import React from "react";
import "../index.css";

function Tag (label) {
    return (
        <div className="label" key={label}><h6><b>{label}</b></h6></div>
    )
}

export default Tag;