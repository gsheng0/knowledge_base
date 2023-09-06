import React from "react";
import "../index.css";

function Timestamps (article) {
    return (
        <div className="timeStamps">
            <h6>Created: {article.createOn}</h6>
            <h6>Last Updated: {article.updateOn}</h6>
        </div>
    )
}

export default Timestamps;