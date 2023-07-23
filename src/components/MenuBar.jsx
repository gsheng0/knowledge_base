import React from "react";

import "../index.css";

function MenuBar (props) {
    return (
        <div>
            <button onClick={props.onSearch}><h3>Search Article</h3>
                </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={props.onNew}><h3>New Article</h3>
                </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={props.onSave}><h3>Save Change</h3>
                </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={props.onRevert}><h3>Revert Change</h3>
                </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={props.onLabel}><h3>Manable Labels</h3>
                </button>
        </div>
    );
}

export default MenuBar;