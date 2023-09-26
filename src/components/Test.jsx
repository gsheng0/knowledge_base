import React from "react";
import Select from "react-select";
import { useState } from "react";

import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
//  https://www.devtip.co/react-quil/

function Test() {
    const [selectedOptions, setSelectedOptions] = useState();
    const [editorValue, setEditorValue] = useState('');

    function onSubmit(event) {
        event.preventDefault();
        const labels = event.target.labels;
        for (var i=0; i<labels.length; i++) {
            console.log(labels[i].value);    
        }
        const quill = event.target.quill;
        console.log(quill);
        
        debugger
    }

    function handleSelect(data) {
        setSelectedOptions(data);
        console.log(data);
    }

    return(
        <form onSubmit={onSubmit}>
            <input name="articleLabel" type="text" placeholder="articleLabel"  defaultValue=""/><br /><br />
            <Select 
                name="labels"
                options={[
                    {value: "1", label: "AAA"},
                    {value: "2", label: "BBB"},
                    {value: "3", label: "CCC"},
                    {value: "4", label: "DDD"},
                    {value: "5", label: "EEE"},
                ]}
                placeholder="select label(s)"
                value={selectedOptions}
                onChange={handleSelect}
                isSearchable={true}
                isMulti
            />   
            <button type="submit">Apply</button>

            <ReactQuill 
                id="quill"
                name="quill"
                value={editorValue}
                onChange={(value) => { 
                    console.log("editor changed to:");
                    console.log(value);
                    setEditorValue(value);
                }}
            />
        </form>                
    );
}

export default Test;