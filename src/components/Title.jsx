import React from "react";
import "../index.css";

function Title (article) {
    return (
        <div className="title"><h2><b>{article.title}</b></h2></div>        
    )
}

export default Title;