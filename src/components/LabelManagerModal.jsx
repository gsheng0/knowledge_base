import React from "react";
import Modal from 'react-modal';
// import EasyEdit, { Types } from "react-easy-edit";

import "../index.css";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

// import {Database} from "../Util";
import { KbRepo } from "../KbRepo";


function LabelManagerModal(props) {
    const [labelList, setLabelList] = useState([]);
    useEffect(()=>{
        KbRepo.getLabelList((dbLabelList)=>{ setLabelList(dbLabelList); });
        // setLabelList([{id: "1", articleLabel: "label one", originalArticleLabel: "label one", status: "intact"}, 
        //               {id: "2", articleLabel: "label two", originalArticleLabel: "label two", status: "intact"}]);
    }, []);

    function createNewLabel() {
        setLabelList(labelList.concat({id: uuid(), articleLabel: "", origArticleLabel: "", status: "new"}));
    }


    function applyLabel(event) {
        var id = event.target.id.value;
        var val = event.target.label.value;
        event.preventDefault();
        var newLabelList = labelList.map((label) => {
            var newLabel; // = {id: "", articleLabel: "", originalArticleLabel: "", status: ""}; 
            if (label.id === id) {
                if (label.status === "intact") {
                    label.status = "changed";
                }
                if (val === "") {
                    val = "cannot be empty";
                }
                newLabel = {...label, status: label.status, articleLabel: val};
            }
            else 
                newLabel = {...label};
            return newLabel;
        });
        setLabelList(newLabelList);        
    }
   
    function Label(label) {
        return(
            <li key={label.id}>
                <form onSubmit={applyLabel}>
                    <input name="id" defaultValue={label.id} readOnly /> &nbsp;&nbsp;&nbsp;
                    <input name="label" type="text" placeholder="article label" defaultValue={label.articleLabel}  /> &nbsp;&nbsp;&nbsp;
                    <label>{label.status}</label>&nbsp;&nbsp;
                    <a href="." onClick={(event)=>{
                        event.preventDefault();
                        var newLableList = labelList.filter((stateLabel)=>{ 
                            if (stateLabel.id === label.id) {
                                if (stateLabel.status === "new") {
                                    return false;
                                }
                            }
                            return true;
                        }).map((stateLabel) => {
                            if (stateLabel.id === label.id) {
                                stateLabel.status = stateLabel.status === 'deleted' ? "intact" : "deleted";  
                            }
                            return stateLabel;
                        });
                        setLabelList(newLableList);        
                    }}>{ label.status === "deleted" ? "un-remove" : "remove" }</a>&nbsp;&nbsp;
                    <button type="submit">OK</button>
                </form>
            </li>
        );
    }

    function save() {
        KbRepo.updateLabelList(labelList, (r)=>{})
        // Database.updateLabel(labelList[0]);        
    }

    return(
        <div>
            <Modal isOpen={props.popup} contentLabel="Label Manager Modal" >
                <h2>Label Manager</h2><br />
                <button onClick={createNewLabel}>Add</button>&nbsp;&nbsp;
                <button onClick={save}>save</button>&nbsp;&nbsp;
                <button onClick={props.onClose}>Close</button>
                <ul>{ labelList.map(Label) }</ul>
            </Modal>
        </div>            
    );
}

export default LabelManagerModal;