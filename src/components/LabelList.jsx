import React from "react";
import Label from "./Label"
import "../index.css";
import { smallCardListClassName } from "../AppCss";

function LabelList (props) {
    console.log("[LabelList] rendering......");
    console.log(props);
    return (
        <div className={smallCardListClassName} >
        {
          props.labelList.map(label => {
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
