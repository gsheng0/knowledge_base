import React from "react";
import "../index.css";

function ArticleLabelList(props) {
    console.log("[ArticleLabelList] rendering ......");
    console.log(props);
    if (props.labelList.length > 0) {
        return (
            <div className="ml-2 flex flex-wrap gap-1">
                {props.labelList.map((currLabel) => {
                    {/* return <button className="w-16 rounded-lg border bg-green-100 border-blue-800" key={currLabel.value}>{currLabel.label}</button> */}
                    return <div className="rounded-lg border bg-green-100 border-green-400" key={currLabel.value}>{currLabel.label}</div>
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
