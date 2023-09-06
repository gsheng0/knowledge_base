import React from "react";
import Modal from 'react-modal';

import "../index.css";

function SearchCriterialModal(props) {
    return (            
        <div>
            <Modal isOpen={props.popup} contentLabel="Search Criteria Modal" >
                <h3>Enter Search Criteria</h3>
                <form onSubmit={props.onSubmit}>
                    <input 
                        id="searchCriteriaField" 
                        name="searchCriteriaField" 
                        type="text"
                        placeholder="search critria" 
                        defaultValue={props.criteria}
                    /> <br />
                    <button onClick={props.onCancel}>Cancel</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button>Apply</button>
                </form>
            </Modal>
        </div>
    );
}

export default SearchCriterialModal;