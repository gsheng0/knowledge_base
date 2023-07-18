import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import {Database} from "../Util";

import "../index.css";
import Article from "./Article";

function getCurrDateTimeString() {    
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + "." + today.getMilliseconds();
    return date+'T'+time;
}

function App () {
    const [articleList, setArticleList] = useState([]);
    useEffect(()=>{
        Database.getMostRecentArticles(4, (dbArticleList) => {
            setArticleList(dbArticleList);
        }); }, [] // only initial run
    ); 

    function submit(event) {
        event.preventDefault();
        var actionType = event.target.actionType.value;
        if (actionType === "retrieve") { 
            var inputCriteria = event.target.searchCriteriaField.value;
            if (inputCriteria === "") {
                inputCriteria = "WILL-NEVER-EXIST";
            }
            console.log("criteria:" + inputCriteria);
            Database.searchForArticle(inputCriteria, (dbArticleList) => {
                setArticleList(dbArticleList);
            });        
        }
        else if (actionType === "add") {
            var newTitle = event.target.title.value;
            var newContent = event.target.content.value;
            if (newTitle === "" || newContent === "") {
                console.log("title or content can't be empty!");
                return;
            }
            console.log("adding " + newTitle + "......");
            var datetimestr = getCurrDateTimeString();
            setArticleList(prevalue => { 
                return [...prevalue,{   id: uuid(),
                                        title: newTitle,
                                        content: newContent,
                                        labels: [],
                                        createOn: datetimestr, 
                                        updateOn: datetimestr   }
                ];
            });
            console.log("after add:" + articleList);
        }
        else if (actionType === "save") {
            articleList
                .filter((article)=>{ return !isNaN(+article.id); })
                .forEach((article)=>{Database.uploadArticle(article,(articleId)=>{});})
            ;
        }
    }

    return (
        <div id="App">
            <div className="controlPanel">
                <form onSubmit={submit}>
                    <input name="title" type="text" placeholder="Title" /><br />
                    <textarea name="content" placeholder="content" rows={5} cols={40} /><br />
                    <label><input type="radio" value="add" name="actionType" defaultChecked />Add&nbsp;&nbsp;&nbsp;</label>
                    <label><input type="radio" value="save" name="actionType" />Save&nbsp;&nbsp;&nbsp;</label>
                    <label><input type="radio" value="retrieve" name="actionType" />Retrieve</label>
                    {/* <select id="actionType" name="actionType">                        <option value="add">add</option>                        <option value="retrieve">retrieve</option>                        <option value="save">save</option>                    </select> */}
                    <br />
                    <input 
                        id="searchCriteriaField" 
                        name="searchCriteriaField" 
                        type="text"
                        placeholder="search critria" 
                    />&nbsp;&nbsp;&nbsp;
                    <button><h2>Submit</h2></button>
                </form>
            </div>
            <div className="AticleList">
                { articleList.map(Article) }
            </div>
        </div> 
     ) ;
};

export default App;