import React from "react";
import "../index.css";

function Label (props) {

    function handleDelete() {
        console.log('[Label] delete label');
        props.onLabelDeleteRequest(props.label.id);
    }

    function handleEdit() {
        console.log('[Label] edit label');
        props.onLabelEditRequest(props.label.id);
    }

    console.log("[Label] rendering......"); 
    console.log(props);
    return (
        <div className="label" key={props.label.id} >
            <h4><b>{props.label.articleLabel}</b></h4>
            {props.label.id} [{props.label.status}] &nbsp;&nbsp;
            <button onClick={handleEdit}>edit</button>&nbsp;&nbsp;
            <button onClick={handleDelete}>delete</button>    
        </div>        
    );
}

export default Label;