import React from "react";
import Modal from 'react-modal';

import "../index.css";

function EditArticleModal(props) {
    return(
        <div>
            <Modal isOpen={props.popup} contentLabel="Article Editing Modal" >
                <h2>{ props.articleToEdit.id === "" ? "Creating New " : "Editing Existing "} 
                    Article......</h2><br />
                <form onSubmit={props.onSubmit}>
                    <label>ID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input name="id" type="text" placeholder="id" readOnly 
                            value={props.articleToEdit.id}/><br />
                    <label>TITLE &nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input name="title" type="text" placeholder="Title" 
                            defaultValue={props.articleToEdit.title}/><br /><br />
                    <textarea name="content" placeholder="content" rows={20} cols={100} 
                            defaultValue={props.articleToEdit.content}/><br />
                    <label>Status &nbsp;&nbsp;</label>
                        <input name="status" type="text" placeholder="status" readOnly 
                            value={props.articleToEdit.status}/><br /><br />
                    <button onClick={props.onCancel}>Cancel</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="submit">Apply</button>
                </form>
            </Modal>
        </div>            
    );
}

export default EditArticleModal;