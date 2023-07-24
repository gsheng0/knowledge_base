import React from "react";
import Label from "./Label"
import "../index.css";

function LabelList (Props) {
    return (
        <div className="labelList" >
            {Props.labelList.map(Label)}
        </div>
    )
}

export default LabelList;
