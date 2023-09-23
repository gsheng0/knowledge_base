import React from "react";
import Label from "./Label"
import "../index.css";
import { LABELS } from "./MenuBar";


function LabelList (props) {
    console.log("[LabelList] rendering......");
    console.log(props);
        return (
        <div className="labelList" >
        {
            props.currMainScreen === LABELS
            && props.labelList 
            && props.labelList.length > 0  
            && props.labelList.map(label => {
              return (
                <Label 
                    label={label}
                    onLabelDeleteRequest={props.onLabelDelete}
                    onLabelEditRequest={props.onLabelEdit}
                />
              );  
            })
        }
        </div>
    )
}

export default LabelList;
