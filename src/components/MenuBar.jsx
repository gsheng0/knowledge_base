import React from "react";

import "../index.css";

export const ARTICLES = "Notes";
export const LABELS = "Labels";
const screenOptions = [ARTICLES, LABELS];

function screenSelection(selectedScreen, onChangeFunction) {
    return (
        <select value={selectedScreen} onChange={onChangeFunction} 
                style={{fontSize: '26px'}}
        >
            {   screenOptions.map(screen => { 
                    return <option key={screen} value={screen}>{screen}</option>; 
                })
            }
        </select>
    );
}

export function MenuBar (props) {
    return (    
        (props.selectedScreen === ARTICLES) 
        ?
            <div>
                {screenSelection(props.selectedScreen, props.onMainScreenChange)}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={props.onSearchArticle}><h3>Search</h3>
                    </button>&nbsp;&nbsp;&nbsp;
                <button onClick={props.onNewArticle}><h3>New</h3>
                    </button>&nbsp;&nbsp;&nbsp;
                <button onClick={props.onSaveArticleChanges}><h3>Save</h3>
                    </button>&nbsp;&nbsp;&nbsp;
                <button onClick={props.onRevertArticle}><h3>Revert</h3>
                    </button>&nbsp;&nbsp;&nbsp;
            </div>
        :
            <div>
                {screenSelection(props.selectedScreen, props.onMainScreenChange)}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={props.onNewLabel}><h3>New</h3>
                    </button>&nbsp;&nbsp;&nbsp;
                <button onClick={props.onSaveLabelChanges}><h3>Save</h3>
                    </button>&nbsp;&nbsp;&nbsp;
                <button onClick={props.onRevertLabel}><h3>Revert</h3>
                    </button>&nbsp;&nbsp;&nbsp;
            </div>
    );
}

