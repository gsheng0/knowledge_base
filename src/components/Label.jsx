import React from "react";
import "../index.css";

function Label (props) {
    function handleDelete() {
        console.log('delete lable');
        props.onLabelDeleteRequest(props.label.id);
    }

    function handleEdit() {
        console.log('edit lable');
        props.onLabelEditRequest(props.label.id);
    }

    return (
        <div className="label" key={props.label.id} >
            <h4><b>{props.label.articleLabel} - {props.label.status}</b></h4>            
            <button onClick={handleEdit}>edit</button>&nbsp;&nbsp;
            <button onClick={handleDelete}>delete</button>    
        </div>
    )
}

export default Label;