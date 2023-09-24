import React from "react";
import "../index.css";

function ArticleLabelList(props) {
    console.log("[ArticleLabelList] rendering ......");
    console.log(props);
    if (props.labelList.length > 0) {
        return (
            <div className="notWorkarticleLabelList">
                {props.labelList.map((currLabel) => {
                    return <button className="articleLabel" key={currLabel.value}>{currLabel.label}</button>
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
