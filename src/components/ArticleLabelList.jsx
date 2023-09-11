import React from "react";
import "../index.css";

function ArticleLabelList (props) {
    console.log("[ArticleLabelList] ");
    console.log(props.labelList);
    return (
        <div>
        { props.labelList.map((currLabel) => {
            return <label key={currLabel.value}>{currLabel.label}&nbsp;&nbsp;</label>
          })
        }
        </div>
    )
}

export default ArticleLabelList;
