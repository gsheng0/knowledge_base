import Modal from 'react-modal';
import Select from "react-select";
import { useEffect, useState, useRef } from 'react';
import "../index.css";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { actionButtonClassName, pageTitleClassName, notesClassName, formLabelClassName, formInputClassName, formFixedClassName } from '../AppCss';

function EditArticleModal(props) {
    const [selectedLabels, setSelectedLabels] = useState(createSelectedLabels(props));
    const textArea = useRef();

    function createSelectedLabels(props) {
        if (props.articleToEdit && props.articleToEdit.labels) {
            const labels =  props.articleToEdit.labels.map((labelId) => { 
                for (var i=0; i<props.labelOptionList.length; i++) {
                    if (props.labelOptionList[i].value === labelId) {
                        return {value: labelId, label: props.labelOptionList[i].label}; 
                    }
                }
                return [];
            }); 
            return labels;
        }
        return [];
    }

    useEffect(()=>{
        // debugger
        const currSelectedLabels = createSelectedLabels(props);
        console.log("[EditArticleModal] useEffect setSelctedLabels");
        console.log(currSelectedLabels);
        setSelectedLabels(currSelectedLabels);
    }, [props.articleToEdit]);

    function onMultiLableSelectorChange(data) {
        console.log("[EditArticleModal] onChange:")
        console.log(data);
        setSelectedLabels(data);
    }
    
    console.log("[EditArticleModal] rendering......");
    console.log( props);
    console.log(selectedLabels);

    return(
        <div>
            <Modal isOpen={props.popup} contentLabel="Article Editing Modal" >
                <div className={pageTitleClassName}>
                    { props.articleToEdit.id === "" ? "Creating New " : "Viewing Existing "} Notes
                </div>
                <form className={notesClassName} onSubmit={props.onSubmit}>
                    <div className="mb-2 ml-5 grid grid-cols-2">
                        <div className="mt-2 grid">
                            <label className={formLabelClassName}>ID</label>
                            <input type="text" className={formFixedClassName} name="id"  placeholder="id"  readonly
                                value={props.articleToEdit.id}/>
                        </div>
                        <div className="mt-2 grid">
                            <label className={formLabelClassName}>STATUS</label>
                            <input className={formFixedClassName} 
                                    name="status" type="text" placeholder="status" readOnly 
                                    value={props.articleToEdit.status}/>
                        </div>
                        <div className="grid mt-2">
                            <label className={formLabelClassName}>TITLE</label>
                            <input className={formInputClassName} name="title" type="text" placeholder="Title" 
                                    defaultValue={props.articleToEdit.title}/>
                        </div>
                    </div>
                    <textarea ref={textArea} name="textContent" hidden defaultValue={props.articleToEdit.textContent} />
                    <div className='ml-5 mb-5 mr-5'>
                        <label className={formLabelClassName}>CONTENT</label>
                        <ReactQuill 
                            className="mt-1 mb-2 bg-white"
                            value={props.articleToEdit.textContent}
                            onChange={(content, deltal, source, editor) => {            
                                textArea.current.value = content;
                            }}
                            modules={{
                                    toolbar: [
                                    [{ header: [1, 2, false] }],
                                    ['bold', 'italic', 'underline'],
                                    ['image', 'code-block']
                                    ]
                                }}
                        />

                        <label className={formLabelClassName}>LABEL</label>
                        <Select className="mt-1 font-bold text-green-600"
                            name="labels"
                            options={props.labelOptionList}
                            placeholder="select labels"
                            value={selectedLabels}
                            onChange={onMultiLableSelectorChange}
                            isSearchable={true}
                            isMulti
                        />    
                        <div className="mb-5 mt-5 flex gap-2">
                            <button className={actionButtonClassName} type="submit">Apply</button>
                            <button className={actionButtonClassName} onClick={props.onCancel}>Cancel</button>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>            
    );
}

export default EditArticleModal;