import React from "react";
import Label from "./Label"
import "../index.css";
import { LABELS } from "./MenuBar";


function LabelList (props) {
    console.log("[LabelList] rendering......");
    console.log(props);
    return (
        <div className="container mx-auto grid lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-4" >
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
