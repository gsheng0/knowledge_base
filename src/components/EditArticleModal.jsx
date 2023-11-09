import Modal from 'react-modal';
import Select from "react-select";
import { useEffect, useState, useRef } from 'react';
import "../index.css";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import classNames from 'classnames';

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

    const actionButtonClassName = classNames({  "w-16": true, 
                                                "mt-3": true,
                                                "mb-3": true,
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
    return(
        <div>
            <Modal isOpen={props.popup} contentLabel="Article Editing Modal" >
                <div className="mb-3 text-center text-3xl font-extrabold text-blue-800 bg-blue-50">
                    { props.articleToEdit.id === "" ? "Creating New " : "Viewing Existing "} Notes
                </div>
                <form className='text-left text-sm bg-yellow-50 rounded-2xl outline outline-1 outline-yellow-500' onSubmit={props.onSubmit}>
                    <div className="mb-2 ml-5 grid grid-cols-2">
                        <div className="grid grid-cols-8 mt-3">
                            <label className="font-semibold">ID</label>
                            <input type="text" className="col-span-6 text-md" name="id"  placeholder="id"  readonly
                                value={props.articleToEdit.id}/>
                        </div>
                        <div className="grid grid-cols-8 mt-3">
                            <label className="font-semibold col-span-2">STATUS</label>
                            <input className="col-span-2 text-md" 
                                    name="status" type="text" placeholder="status" readOnly 
                                    value={props.articleToEdit.status}/>
                        </div>
                        <div className="grid grid-cols-8 mt-1">
                            <label className="font-semibold mt-1">TITLE</label>
                            <input className="col-span-6 text-lg bg-yellow-50" name="title" type="text" placeholder="Title" 
                                    defaultValue={props.articleToEdit.title}/>
                        </div>
                    </div>
                    <textarea ref={textArea} name="textContent" hidden defaultValue={props.articleToEdit.textContent} />
                    <ReactQuill 
                        className="ml-5 mr-5"
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

                    <Select className="ml-5 mr-5"
                        name="labels"
                        options={props.labelOptionList}
                        placeholder="select labels"
                        value={selectedLabels}
                        onChange={onMultiLableSelectorChange}
                        isSearchable={true}
                        isMulti
                    />    
                    <div className="ml-5 mr-5 mt-2 mb-5 flex flex-row gap-2">
                        <button className={actionButtonClassName} type="submit">Apply</button>
                        <button className={actionButtonClassName} onClick={props.onCancel}>Cancel</button>
                    </div>
                </form>
            </Modal>
        </div>            
    );
}

export default EditArticleModal;