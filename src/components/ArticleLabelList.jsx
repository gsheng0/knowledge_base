import React from "react";
import "../index.css";

function ArticleLabelList (props) {
    console.log("[ArticleLabelList] rendering ......");
    console.log(props);
    if (props.labelList.length > 0) {
        return (
            <div>
            { props.labelList.map((currLabel) => {
                return <label className="articleLabel" key={currLabel.value}>{currLabel.label}&nbsp;&nbsp;</label>
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
