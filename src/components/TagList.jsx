import React from "react";
import Tag from "./Tag"
import "../index.css";

function TagList (article) {
    return (
        <div className="labelList" >
            {article.labels.map(Tag)}
        </div>
    )
}

export default TagList;
