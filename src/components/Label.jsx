import React from "react";
import "../index.css";

function Label(props) {

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
    const actionButtonClassName = "w-16 bg-blue-100 mb-2 mt-2 mr-3 text-center text-sm text-blue-800 rounded-lg border-solid border-1 border-blue-400 outline outline-offset-1 outline-1 hover:text-blue-800 hover:font-extrabold";
    return (
        <div className='text-left text-sm  bg-green-100 rounded-3xl outline outline-1 outline-green-400' key={props.label.id} >
            <div className="ml-2 mr-2 mb-2 text-lg text-center font-extrabold text-blue-800 ">{props.label.articleLabel}</div>
            <div className="ml-5 grid grid-cols-4 text-sm ">
                <div className="font-semibold">ID:</div>
                <div className="col-span-3">{props.label.id}</div>
                <div className="font-semibold">Status:</div>
                <div className="col-span-3">{props.label.status}</div> 
            </div>
            <div className="flex flex-row-reverse">
                <button className={actionButtonClassName} onClick={handleDelete}>Delete</button>    
                <button className={actionButtonClassName} onClick={handleEdit}>Edit</button>
            </div>
        </div>
    );
}

export default Label;