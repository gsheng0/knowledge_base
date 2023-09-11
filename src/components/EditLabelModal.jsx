import React from "react";
import Modal from 'react-modal';
import "../index.css";

function EditLabelModal(props) {
    return(
        <div>
            <Modal isOpen={props.popup} contentLabel="Label Editor" >
                <h2>{ props.labelToEdit.id === "" ? "Creating New " : "Editing Existing "} 
                    Label......</h2><br />
                <form onSubmit={props.onSubmit}>
                    <label>ID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input name="id" type="text" placeholder="id" readOnly 
                            value={props.labelToEdit.id} /><br />
                    <label>Article Label &nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input name="articleLabel" type="text" placeholder="articleLabel" 
                            defaultValue={props.labelToEdit.articleLabel}/><br /><br />
                    <label>Status &nbsp;&nbsp;</label>
                        <input name="status" type="text" placeholder="status" readOnly 
                            value={props.labelToEdit.status}/><br /><br />
                    <button type="submit">Apply</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={props.onCancel}>Cancel</button>
                </form>                
            </Modal>
        </div>            
    );
}

export default EditLabelModal;