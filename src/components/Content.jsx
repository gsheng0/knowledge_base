
import React from "react";
import "../index.css";

function Content (article) {
    return (
        <div className="content">
            <h5>{article.content.substring(0,64)}</h5>
        </div>
    )
}

export default Content;