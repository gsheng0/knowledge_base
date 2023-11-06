import React from "react";
import "../index.css";

function ArticleLabelList(props) {
    console.log("[ArticleLabelList] rendering ......");
    console.log(props);
    if (props.labelList.length > 0) {
        return (
            <div className="flex gap-1">
                {props.labelList.map((currLabel) => {
                    return <button className="ml-2 rounded-lg border bg-yellow-200 border-blue-800" key={currLabel.value}>{currLabel.label}</button>
                })
                }
            </div>
        )
    }
    else {
        return (<div></div>);
    }
}

export default ArticleLabelList;
