import React from "react";
import Select from "react-select";
import { useState } from "react";

function Test() {
    const [selectedOptions, setSelectedOptions] = useState();

    function onSubmit(event) {
        event.preventDefault();
        console.log(event.target.labels);
        const labels = event.target.labels;
        // console.log(labels[0].value);
        for (var i=0; i<labels.length; i++) {
            console.log(labels[i].value);    
        }
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
        </form>                
    );
}

export default Test;