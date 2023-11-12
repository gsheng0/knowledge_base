import React from "react";
import Modal from 'react-modal';
import classNames from "classnames";
import "../index.css";

function SearchCriterialModal(props) {
    console.log("[SearchCriterialModal] rendering......");
    console.log(props);
    const actionButtonClassName = classNames({
        "w-16": true, 
        "ml-5 mt-2 mb-2": true,
        "bg-blue-100": true, 
        "rounded-lg": true,  
        "border-solid": true,  
        "border-1": true, 
        "border-blue-400": true,
        "outline": true,
        "outline-offset-1": true,
        "outline-1": true,
        "hover:text-blue-800": true,
        "hover:font-extrabold": true
    });

    return (            
        <div>
            <Modal isOpen={props.popup} contentLabel="Search Criteria Modal" >
                <div className="mb-3 text-3xl font-extrabold text-blue-800 bg-blue-50">
                    Enter Search Criteria
                </div>
                <form onSubmit={props.onSubmit} className="grid">
                    <lable className=" text-lg mb-2">Pattern will be matched in title, content, and label:</lable>
                    <input className="w-1/3"
                        id="searchCriteriaField" 
                        name="searchCriteriaField" 
                        type="text"
                        placeholder="search critria" 
                        defaultValue={props.criteria}
                    />
                    <div className="flex">
                        <button className={actionButtonClassName}>Apply</button>
                        <button className={actionButtonClassName} onClick={props.onCancel}>Cancel</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default SearchCriterialModal;